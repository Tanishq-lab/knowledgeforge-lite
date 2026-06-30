import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AuthService } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
  if (isAuthenticated) {
    navigate("/dashboard");
  }
}, [isAuthenticated, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const result = await AuthService.login({
        email,
        password,
      });

      login(result.access_token);

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          KnowledgeForge
        </h1>

        <p className="mb-8 text-center text-slate-400">
          AI-Powered Document Intelligence
        </p>

        <div className="space-y-5">

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            className="w-full"
            onClick={handleLogin}
          >
            Login
          </Button>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;