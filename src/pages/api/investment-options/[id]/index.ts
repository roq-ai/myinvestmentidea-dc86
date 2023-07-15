import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { investmentOptionValidationSchema } from 'validationSchema/investment-options';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.investment_option
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getInvestmentOptionById();
    case 'PUT':
      return updateInvestmentOptionById();
    case 'DELETE':
      return deleteInvestmentOptionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInvestmentOptionById() {
    const data = await prisma.investment_option.findFirst(convertQueryToPrismaUtil(req.query, 'investment_option'));
    return res.status(200).json(data);
  }

  async function updateInvestmentOptionById() {
    await investmentOptionValidationSchema.validate(req.body);
    const data = await prisma.investment_option.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteInvestmentOptionById() {
    const data = await prisma.investment_option.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
