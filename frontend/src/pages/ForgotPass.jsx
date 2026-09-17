import { Link } from "react-router-dom";
import { useState } from "react";

import api from "../sevices/api";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { GraduationCap } from "lucide-react";

const ForgotPass = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {

      const response = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(response.data.message);

    } catch (error) {

      const data = error.response?.data;

      if (data?.code === "PASSWORD_RESET_EMAIL_DISABLED") {
        setError(data.message);
        return;
      }
    
      setError(
        data?.message || "Unable to process your request. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-50
        via-white
        to-indigo-50
        px-5
      "
    >

      <Card className="w-full max-w-md shadow-xl">

        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-600
          "
        >
          <GraduationCap />
        </div>

        <h1
          className="
            text-center
            text-3xl
            font-bold
            text-blue-700
          "
        >
          Forgot Password?
        </h1>

        <p
          className="
            mt-2
            text-center
            text-slate-600
          "
        >
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
        >

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && (
            <p className="text-sm text-green-600">
              {message}
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

        </form>

        <p
          className="
            mt-6
            text-center
            text-sm
            text-slate-600
          "
        >
          Remember your password?{" "}

          <Link
            to="/login"
            className="font-medium text-blue-600"
          >
            Login
          </Link>
        </p>

      </Card>

    </div>
  );
};

export default ForgotPass;