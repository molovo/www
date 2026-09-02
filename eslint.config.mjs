import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'

const eslintConfig = [
  {
    ignores: ['.next/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  reactYouMightNotNeedAnEffect.configs.recommended,
  {
    // New in react-hooks v6 (eslint-config-next 16). Downgraded during the
    // Next 16 upgrade; refactor the flagged imperative patterns separately.
    rules: {
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]

export default eslintConfig
