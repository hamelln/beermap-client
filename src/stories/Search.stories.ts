import type { Meta, StoryObj } from "@storybook/react";
import Search from "@/app/page";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "검색 페이지",
  component: Search,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof Search>;

export const Initialize: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        query: {},
      },
    },
    msw: handlers,
  },
};
