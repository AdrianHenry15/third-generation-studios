import { supabase } from "../supabase/client";
import type { Database } from "../types/supabase-types";

type PublicTables = Database["public"]["Tables"];
export type TableName = keyof PublicTables;

type Row<T extends TableName> = PublicTables[T]["Row"];
type Insert<T extends TableName> = PublicTables[T]["Insert"];
type Update<T extends TableName> = PublicTables[T]["Update"];
type IdOf<T extends TableName> = Row<T> extends { id: infer I } ? I : string;
type TablesWithId = {
    [K in TableName]: Row<K> extends { id: unknown } ? K : never;
}[TableName];

// Fetch all rows
export async function fetchTable<T extends TableName>(table: T): Promise<Row<T>[]> {
    const { data, error } = await supabase.from(table).select("*").returns<Row<T>[]>();
    if (error) throw error;
    return data ?? [];
}

// Fetch by id
export async function fetchRowById<T extends TablesWithId>(table: T, id: Row<T>["id"]): Promise<Row<T> | null> {
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id as any)
        .maybeSingle();
    if (error) throw error;
    return data as Row<T> | null;
}

// Insert a row
export async function insertRow<T extends TableName>(table: T, values: Insert<T>): Promise<Row<T>> {
    const { data, error } = await supabase
        .from(table)
        .insert(values as any)
        .select()
        .single();
    if (error) throw error;
    if (!data) throw new Error("Insert returned no data");
    return data as unknown as Row<T>;
}

// Update a row
export async function updateRow<T extends TablesWithId>(table: T, id: Row<T>["id"], values: Update<T>): Promise<Row<T>> {
    const { data, error } = await supabase
        .from(table)
        .update(values as any)
        .eq("id", id as any)
        .select()
        .single();
    if (error) throw error;
    if (!data) throw new Error("Update returned no data");
    return data as unknown as Row<T>;
}

// Delete a row
export async function deleteRow<T extends TablesWithId>(table: T, id: Row<T>["id"]): Promise<boolean> {
    const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", id as any);
    if (error) throw error;
    return true;
}
