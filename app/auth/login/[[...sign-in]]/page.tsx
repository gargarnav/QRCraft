import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <SignIn
            path="/auth/login"
            appearance={{
                elements: {
                    rootBox: "w-full mx-auto",
                    card: "w-full shadow-xl bg-slate-900 border border-slate-800 rounded-xl",
                    headerTitle: "text-white",
                    headerSubtitle: "text-slate-400",
                    socialButtonsBlockButton: "border-slate-700 bg-slate-800 hover:bg-slate-700 text-white",
                    socialButtonsBlockButtonText: "text-white font-medium",
                    formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md",
                    formFieldLabel: "text-slate-300",
                    formFieldInput: "bg-slate-950 border-slate-800 text-white focus:ring-indigo-500 focus:border-indigo-500",
                    dividerLine: "bg-slate-800",
                    dividerText: "text-slate-500",
                    footerActionText: "text-slate-400",
                    footerActionLink: "text-indigo-400 hover:text-indigo-300",
                    identityPreviewText: "text-slate-300",
                    identityPreviewEditButton: "text-indigo-400 hover:text-indigo-300",
                    formResendCodeLink: "text-indigo-400 hover:text-indigo-300",
                },
            }}
        />
    );
}
