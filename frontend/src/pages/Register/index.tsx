import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AuthService } from "@/services/auth";

function RegisterPage() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleRegister = async () => {

    setError("");

    try {

      await AuthService.register({
        username,
        email,
        password,
      });

      alert(
        "Registration successful!"
      );

      navigate("/login");

    } catch {

      setError(
        "Registration failed."
      );

    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Register to use KnowledgeForge
        </p>

        <div className="space-y-5">

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            className="w-full"
            onClick={handleRegister}
          >
            Register
          </Button>

          <p className="text-center text-sm text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;