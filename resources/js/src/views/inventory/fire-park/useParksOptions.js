export default function useCustomersOptions() {
  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
    { label: 'In Progress', value: 'in_progress' },
  ]
  const areaAccessibilityOptions = [
    'Open Access Area',
    'Easy Access',
    'Limited Access',
    'Difficult Access',
    'Restricted Access Area',
    'Inaccessible',
  ]
  const areaClassificationOptions = [
    'High Risk',
    'Medium Risk',
    'Low Risk',
    'Controlled Risk',
    'No Risk',
    'Special Risk',
    'Safe Area',
  ]
  const fixationOptions = [
    { fixation: 'Wall-mounted brackets' },
    { fixation: 'Trolley-mounted brackets' },
    { fixation: 'Vehicle-mounted brackets' },
    { fixation: 'Ceiling hooks' },
    { fixation: 'Floor stands' },
    { fixation: 'Recessed mounts' },
    { fixation: 'Self-adhesive mounts' },
    { fixation: 'Magnetic mounts' },
    { fixation: 'Universal clamps' },
    { fixation: 'Roll bar mounts' },
    { fixation: 'Cam-lock mounts' },
  ]
  const pressureOptions = [
    { text: 'PP', value: 'permanent pressure' },
    { text: 'AP', value: 'auxiliary pressure' },
  ]
  const accessoriesOptions = [
    { text: 'Not available', value: 'Not available' },
    { text: 'Cover', value: 'Cover' },
    { text: 'Box', value: 'Box' },
  ]
  const ceOptions = [
    { text: 'Availability', value: 'Availability' },
  ]
  const signOptions = [
    { text: 'Availability', value: 'Availability' },
  ]
  return {
    // All Park Module Options
    statusOptions,
    areaAccessibilityOptions,
    areaClassificationOptions,
    fixationOptions,
    pressureOptions,
    accessoriesOptions,
    ceOptions,
    signOptions,
  }
}
