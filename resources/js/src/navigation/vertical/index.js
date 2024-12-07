export default [
//   {
//     title: 'Home',
//     route: 'home',
//     icon: 'HomeIcon',
//   },
  {
    title: '1. Introduction',
    route: 'introduction',
    icon: 'InfoIcon',
  },
  {
    title: '2. Strategies',
    route: 'strategies',
    icon: 'EyeIcon',
  },
  {
    title: '3. Policies',
    route: 'policies',
    icon: 'FeatherIcon',
  },
  {
    title: '4. Manuals',
    icon: 'BookOpenIcon',
    children: [
      {
        title: 'Operations Manual',
        route: 'operations-manual',
      },
      {
        title: 'Employee Handbook',
        route: 'employee-handbook',
      },
      {
        title: 'Shortcut Employee Handbook',
        route: 'employee-handbook-short-cut',
      },
    ],
  },
  {
    title: '5. Templates and Forms',
    route: 'templates-forms',
    icon: 'FileTextIcon',
  },
  {
    title: '6. Monitoring and Evaluation',
    route: 'monitoring-evaluation',
    icon: 'ActivityIcon',
  },
  {
    title: '7. Continuous Improvement',
    route: 'continuous-improvement',
    icon: 'TrendingUpIcon',
  },
]
