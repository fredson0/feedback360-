-- CreateTable
CREATE TABLE "public"."feedback_likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feedback_likes_userId_feedbackId_key" ON "public"."feedback_likes"("userId", "feedbackId");

-- AddForeignKey
ALTER TABLE "public"."feedback_likes" ADD CONSTRAINT "feedback_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."feedback_likes" ADD CONSTRAINT "feedback_likes_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "public"."Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;
