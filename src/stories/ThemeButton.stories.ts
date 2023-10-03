// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import ThemeButton from "@/components/ThemeButton";

const meta = {
  title: "테마 버튼",
  component: ThemeButton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ThemeButton>;

export default meta;
type Story = StoryObj<typeof ThemeButton>;

export const Light: Story = {};
export const Dark: Story = {};
