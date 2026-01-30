import React from "react";
import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <Card className="w-full max-w-md text-center shadow-xl rounded-2xl">
        <CardHeader className="space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
            <Mail className="h-7 w-7 text-pink-700" />
          </div>

          <CardTitle className="text-2xl font-bold">
            Check your email
          </CardTitle>

          <CardDescription>
            We’ve sent a verification link to your email address.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
            Please check your inbox and click the link to verify your account.
            If you don’t see it, check your spam folder.
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Resend email")}
          >
            Resend verification email
          </Button>

          <p className="text-xs text-muted-foreground">
            Didn’t receive the email? You can request a new one.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Verify;
