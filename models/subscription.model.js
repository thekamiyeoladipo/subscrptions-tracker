import mongoose from "mongoose";
import { MdJoinLeft } from "react-icons/md";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      Maxlength: [100, "Subscription name cannot exceed 100 characters"],
      minlength: [3, "Subscription name must be at least 3 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price cannot be negative"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "GBP", "NGN"], // Add more currencies as needed
      default: "USD",
    },
    frequency: {
      type: String,
      required: [true, "Subscription frequency is required"],
      enum: ["monthly", "yearly", "weekly"], // Add more frequencies as needed
      default: "monthly",
    },
    category: {
      type: String,
      required: [true, "Subscription category is required"],
      enum: [
        "entertainment",
        "utilities",
        "food",
        "health",
        "education",
        "other",
      ], // Add more categories as needed
      default: "other",
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: [true, "Payment method is required"],
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer"], // Add more payment methods as needed
      default: "credit_card",
    },
    status: {
      type: String,
      required: [true, "Subscription status is required"],
      enum: ["active", "inactive", "cancelled"], // Add more statuses as needed
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      default: Date.now,
      validate: {
        validator: function (v) {
          return v <= Date.now();
        },
        message: "Start date cannot be in the future",
      },
      renewalDate: {
        type: Date,
        required: [true, "Subscription renewal date is required"],
        validate: {
          validator: function (v) {
            return v > this.startDate;
          },
          message: "Renewal date must be after the start date",
        },
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true,
      },
    },
  },
  { timestamps: true }
);

// Auto-calculate renewal date based on frequency
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // auto-update the status if renewal date is in the past
  if (this.renewalDate < Date.now()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
