import { prisma } from "@/server/db";
import dayjs from "dayjs";
import sgMail from "@sendgrid/mail";

export async function GET() {
  try {
    const date = dayjs(Date.now()).toDate();
    const problems = await prisma.userProblem.findMany({
      where: {
        lastSolved: {
          lte: date,
        },
      },
      include: {
        User: true,
      },
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    for await (let problem of problems) {
      await sgMail
        .send({
          to: problem.User.email,
          from: "prateek_soni@outlook.com",
          subject: "Here's your daily leetcode problem",
          html: `
          <h1>Your daily leetcode problems</h1>
          <ul>
            <a href="${problem.problemUrl}">${problem.problemUrl}</a>
          </ul>
          <p>
            Note: Make sure you mark it done at <a href="https://leetcode-tracker.vercel.com">https://leetcode-tracker.vercel.com</a>
          </p>
      `,
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
}
