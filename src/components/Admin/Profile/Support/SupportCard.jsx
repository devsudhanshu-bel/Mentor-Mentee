import React from "react";
import {
  Headset,
  UserCircle2,
  Mail,
  Phone,
  Clock3,
} from "lucide-react";

const SupportCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center gap-2">
        <Headset
          size={18}
          className="text-blue-600"
        />

        <h2 className="text-[18px] font-semibold text-slate-900">
          Need Help?
        </h2>
      </div>

      <p className="mb-4 text-[13px] leading-5 text-slate-500">
        Contact the system administrator if you face any issues
        with your account or the mentoring portal.
      </p>

      <div className="grid grid-cols-5 gap-4">
        {/* Admin */}
        <div>
          <p className="mb-1 text-[12px] font-medium text-slate-500">
            System Administrator
          </p>

          <div className="flex items-center gap-2">
            <UserCircle2
              size={16}
              className="text-slate-500"
            />

            <span className="text-[13px] font-medium text-slate-700">
              John Anderson
            </span>
          </div>
        </div>

        {/* Email */}
        <div>
          <p className="mb-1 text-[12px] font-medium text-slate-500">
            Email
          </p>

          <div className="flex items-center gap-2">
            <Mail
              size={16}
              className="text-slate-500"
            />

            <span className="text-[13px] text-slate-700">
              admin@christuniversity.in
            </span>
          </div>
        </div>

        {/* Phone */}
        <div>
          <p className="mb-1 text-[12px] font-medium text-slate-500">
            Phone
          </p>

          <div className="flex items-center gap-2">
            <Phone
              size={16}
              className="text-slate-500"
            />

            <span className="text-[13px] text-slate-700">
              +91 98765 12345
            </span>
          </div>
        </div>

        {/* Office */}
        <div>
          <p className="mb-1 text-[12px] font-medium text-slate-500">
            Office
          </p>

          <span className="text-[13px] text-slate-700">
            IT Services, Block A
          </span>
        </div>

        {/* Hours */}
        <div>
          <p className="mb-1 text-[12px] font-medium text-slate-500">
            Support Hours
          </p>

          <div className="flex items-center gap-2">
            <Clock3
              size={16}
              className="text-slate-500"
            />

            <span className="text-[13px] text-slate-700">
              Mon - Fri | 9:00 AM - 5:00 PM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCard;