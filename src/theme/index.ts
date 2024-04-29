import { createTheme, MantineThemeOverride } from '@mantine/core';
import { ThemeColors } from '@/theme/config/colors.ts';

const theme: MantineThemeOverride = createTheme({
  fontFamily: 'var(--base-font)',
  colors: ThemeColors,
  defaultRadius: 'sm',
  primaryColor: 'theme',
  primaryShade: 7,
  components: {} // add your custom component overrides here
});

export default theme;
