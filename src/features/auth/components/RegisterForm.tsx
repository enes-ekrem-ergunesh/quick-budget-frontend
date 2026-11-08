import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { useState } from "react";

export default function RegisterForm({ handleSubmit }: { handleSubmit: any }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const CONFIRM_PASSWORD_VALIDITY_ERROR = "Passwords should match"

  function confirmPasswordValidate(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (password !== confirmPassword){
      (document.getElementById('confirmPassword') as HTMLInputElement).setCustomValidity(CONFIRM_PASSWORD_VALIDITY_ERROR)
    }
    else {
      handleSubmit(e)
    }
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={confirmPasswordValidate}>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* Confirm Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement
                    setConfirmPassword(target.value)
                    if (target.value !== password){
                      target.setCustomValidity(CONFIRM_PASSWORD_VALIDITY_ERROR)
                    }
                    else {
                      target.setCustomValidity("")
                    }
                  }}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="register-form" className="w-full">
            Submit
          </Button>
          <Separator />
          <p>
            Already have an account?{" "}
            <Link to="/login" className="hover:underline font-medium">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
