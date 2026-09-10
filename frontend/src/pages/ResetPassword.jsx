import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import api from "../sevices/api";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { GraduationCap } from "lucide-react";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {

      const response = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
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
          Reset Password
        </h1>

        <p
          className="
            mt-2
            text-center
            text-slate-600
          "
        >
          Create a new password for your Examio account.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
        >

          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;