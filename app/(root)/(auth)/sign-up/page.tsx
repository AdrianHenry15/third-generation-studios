import SignUpForm from "@/components/auth/sign-up-form";
import { Message } from "@/components/form-message";

export default async function SignUp(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return <SignUpForm searchParams={searchParams} />;
}
