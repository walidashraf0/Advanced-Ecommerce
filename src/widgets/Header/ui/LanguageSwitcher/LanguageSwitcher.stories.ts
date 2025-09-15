import type { Meta, StoryObj } from "@storybook/react-vite";

import LanguageSwithcher from "./LanguageSwithcher";

const meta = {
  title: "widgets/LanguageSwithcher",
  component: LanguageSwithcher,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LanguageSwithcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
