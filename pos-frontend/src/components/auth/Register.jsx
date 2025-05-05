import React, { useState } from "react";
import { register } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Eye, EyeOff } from "lucide-react";

const Register = ({ setIsRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Limit phone number to 10 digits
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
      phone: "",
    };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    registerMutation.mutate(formData);
  };

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });

      setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    },
    onError: (error) => {
      const { response } = error;
      enqueueSnackbar(response.data.message, { variant: "error" });
    },
  });

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Employee Name
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Employee Email
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Employee Phone
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter employee phone"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Password
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-400 ml-2 focus:outline-none"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Choose your role
          </label>
          <div className="flex item-center gap-3 mt-4">
            {["Waiter", "Admin"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] ${
                  formData.role === role ? "bg-indigo-700" : ""
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition-all duration-200"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
