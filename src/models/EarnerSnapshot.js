import mongoose from "mongoose";

const EarnerSnapshotSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true
    },

    fiType: {
      type: String,
      enum: [
        "deposit",
        "recurring_deposit",
        "term_deposit",
        "mutual_funds"
      ],
      required: true
    },

    payload: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "EarnerSnapshot",
  EarnerSnapshotSchema
);
