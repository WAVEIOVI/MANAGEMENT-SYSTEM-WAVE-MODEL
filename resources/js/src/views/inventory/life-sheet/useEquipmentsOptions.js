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
    { accessories: 'Not available' },
    { accessories: 'fire extinguisher cover' },
    { accessories: 'fire hose cover' },
    { accessories: 'fire extinguisher box' },
    { accessories: 'fire hose box' },
  ]
  const ceOptions = [
    { text: 'Availability', value: 'Availability' },
  ]
  const signOptions = [
    { sign: 'Not available' },
    { sign: 'Pictogram' },
    { sign: 'Sign Big Size' },
    { sign: 'Sign Medium Size' },
    { sign: 'Sign Small Size' },
    { sign: 'Sign Numbering S' },
    { sign: 'Sign Numbering B' },
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
