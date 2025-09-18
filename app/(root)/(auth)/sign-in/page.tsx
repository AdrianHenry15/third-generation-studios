import SignInForm from "@/components/auth/sign-in-form";
import { Message } from "@/components/form-message";

export default async function SignIn(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return <SignInForm searchParams={searchParams} />;
}
