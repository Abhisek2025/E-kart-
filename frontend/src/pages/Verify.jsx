import React from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 px-4">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="text-center shadow-2xl rounded-3xl border-0">
          <CardHeader className="space-y-3">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100"
            >
              <Mail className="h-8 w-8 text-pink-700" />
            </motion.div>

            <CardTitle className="text-2xl font-bold">
              Check your email
            </CardTitle>

            <CardDescription className="text-sm">
              We’ve sent a verification link to your email address.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
              Please check your inbox and click the link to verify your account.
              If you don’t see it, check your spam folder.
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {/* Animated Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full"
            >
              <Button
                className="w-full bg-amber-400 hover:bg-amber-500 text-black rounded-xl"
                onClick={() => console.log("Resend email")}
              >
                Resend verification email
              </Button>
            </motion.div>

            <p className="text-xs text-muted-foreground">
              Didn’t receive the email? You can request a new one.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Verify;
