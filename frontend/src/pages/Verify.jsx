import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    API.get(`/users/verify/${token}`)
      .then((res) => {
        setMessage("✅ Email verified successfully!");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        setMessage("❌ Verification failed");
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-lg">{message}</h2>
    </div>
  );
}