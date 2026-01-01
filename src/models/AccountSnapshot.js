import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: String,
    currentBalance: String,
    mode: String,
    narration: String,
    reference: String,
    transactionTimestamp: String,
    txnId: String,
    type: String,
    valueDate: String
  },
  { _id: false }
);

const AccountSnapshotSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true
    },
    type: String,
    masked_account_number: String,

    profile: Object,

    summary: {
      currentBalance: String,
      currency: String,
      status: String
    },

    transactions: {
      transaction: [TransactionSchema]
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "AccountSnapshot",
  AccountSnapshotSchema
);
