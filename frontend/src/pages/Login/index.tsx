import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/auth";

function LoginPage() {
  const [message, setMessage] = useState("");

  const testLogin = async () => {
    try {
      const result = await AuthService.login({
        email: "abc@gmail.com",
        password: "hello123",
      });

      localStorage.setItem("access_token", result.access_token);

      setMessage("Login Successful ✅");
    } catch {
      setMessage("Login Failed ❌");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4">
        <Button onClick={testLogin}>
          Test Login
        </Button>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default LoginPage;