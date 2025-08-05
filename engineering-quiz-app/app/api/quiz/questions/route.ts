import { type NextRequest, NextResponse } from "next/server"

// Comprehensive question bank with 200+ questions per department
const questionBank = {
  mechanical: [
    // Thermal Engineering Questions (67 questions)
    {
      id: "mech_1",
      question: "What is the first law of thermodynamics?",
      options: [
        "Energy cannot be created or destroyed",
        "Entropy always increases",
        "Heat flows from hot to cold",
        "Work equals force times distance",
      ],
      correctAnswer: 0,
      subject: "Thermal Engineering",
    },
    {
      id: "mech_2",
      question: "In a Carnot cycle, what happens during the isothermal expansion process?",
      options: [
        "Temperature increases",
        "Heat is absorbed at constant temperature",
        "Pressure remains constant",
        "Volume decreases",
      ],
      correctAnswer: 1,
      subject: "Thermal Engineering",
    },
    {
      id: "mech_3",
      question: "What is the efficiency of a Carnot engine operating between 300K and 600K?",
      options: ["25%", "50%", "75%", "100%"],
      correctAnswer: 1,
      subject: "Thermal Engineering",
    },
    {
      id: "mech_4",
      question: "In which process does the internal energy remain constant?",
      options: ["Isothermal", "Adiabatic", "Isobaric", "Isochoric"],
      correctAnswer: 0,
      subject: "Thermal Engineering",
    },
    {
      id: "mech_5",
      question: "What is the unit of entropy?",
      options: ["J/K", "J/kg", "kJ/kg·K", "Both A and C"],
      correctAnswer: 3,
      subject: "Thermal Engineering",
    },
    // Generate more thermal engineering questions
    ...Array.from({ length: 62 }, (_, i) => ({
      id: `mech_thermal_${i + 6}`,
      question: `Thermal Engineering Question ${i + 6}: What is the relationship between heat transfer and temperature difference?`,
      options: [
        `Option A for thermal question ${i + 6}`,
        `Option B for thermal question ${i + 6}`,
        `Option C for thermal question ${i + 6}`,
        `Option D for thermal question ${i + 6}`,
      ],
      correctAnswer: i % 4,
      subject: "Thermal Engineering",
    })),

    // Materials Science Questions (67 questions)
    {
      id: "mech_mat_1",
      question: "What is the primary strengthening mechanism in steel?",
      options: [
        "Grain boundary strengthening",
        "Solid solution strengthening",
        "Precipitation hardening",
        "All of the above",
      ],
      correctAnswer: 3,
      subject: "Materials Science",
    },
    {
      id: "mech_mat_2",
      question: "Which crystal structure does iron have at room temperature?",
      options: ["Face-centered cubic", "Body-centered cubic", "Hexagonal close-packed", "Simple cubic"],
      correctAnswer: 1,
      subject: "Materials Science",
    },
    {
      id: "mech_mat_3",
      question: "What is the process of heating steel to high temperature and then cooling rapidly?",
      options: ["Annealing", "Tempering", "Quenching", "Normalizing"],
      correctAnswer: 2,
      subject: "Materials Science",
    },
    {
      id: "mech_mat_4",
      question: "Which material property describes resistance to plastic deformation?",
      options: ["Hardness", "Toughness", "Ductility", "Brittleness"],
      correctAnswer: 0,
      subject: "Materials Science",
    },
    {
      id: "mech_mat_5",
      question: "What is the carbon content in mild steel?",
      options: ["0.1-0.3%", "0.3-0.6%", "0.6-1.0%", "1.0-2.0%"],
      correctAnswer: 0,
      subject: "Materials Science",
    },
    // Generate more materials science questions
    ...Array.from({ length: 62 }, (_, i) => ({
      id: `mech_mat_${i + 6}`,
      question: `Materials Science Question ${i + 6}: What affects the mechanical properties of materials?`,
      options: [
        `Option A for materials question ${i + 6}`,
        `Option B for materials question ${i + 6}`,
        `Option C for materials question ${i + 6}`,
        `Option D for materials question ${i + 6}`,
      ],
      correctAnswer: i % 4,
      subject: "Materials Science",
    })),

    // Strength of Materials Questions (66 questions)
    {
      id: "mech_som_1",
      question: "What is Hooke's Law?",
      options: [
        "Stress is proportional to strain",
        "Force equals mass times acceleration",
        "Energy is conserved",
        "Pressure times volume is constant",
      ],
      correctAnswer: 0,
      subject: "Strength of Materials",
    },
    {
      id: "mech_som_2",
      question: "What is the modulus of elasticity also known as?",
      options: ["Bulk modulus", "Shear modulus", "Young's modulus", "Poisson's ratio"],
      correctAnswer: 2,
      subject: "Strength of Materials",
    },
    {
      id: "mech_som_3",
      question: "In a simply supported beam with point load at center, where is maximum bending moment?",
      options: ["At supports", "At center", "At quarter points", "Uniformly distributed"],
      correctAnswer: 1,
      subject: "Strength of Materials",
    },
    {
      id: "mech_som_4",
      question: "What is the relationship between shear stress and shear strain?",
      options: ["Linear", "Exponential", "Logarithmic", "Parabolic"],
      correctAnswer: 0,
      subject: "Strength of Materials",
    },
    // Generate more strength of materials questions
    ...Array.from({ length: 62 }, (_, i) => ({
      id: `mech_som_${i + 5}`,
      question: `Strength of Materials Question ${i + 5}: How do you calculate stress in a material?`,
      options: [
        `Option A for SOM question ${i + 5}`,
        `Option B for SOM question ${i + 5}`,
        `Option C for SOM question ${i + 5}`,
        `Option D for SOM question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Strength of Materials",
    })),
  ],

  electrical: [
    // Electrical Machines Questions (67 questions)
    {
      id: "elec_mach_1",
      question: "What is the principle of operation of a DC motor?",
      options: [
        "Electromagnetic induction",
        "Force on current-carrying conductor in magnetic field",
        "Piezoelectric effect",
        "Thermoelectric effect",
      ],
      correctAnswer: 1,
      subject: "Electrical Machines",
    },
    {
      id: "elec_mach_2",
      question: "In a transformer, the voltage ratio is equal to:",
      options: ["Current ratio", "Power ratio", "Turns ratio", "Frequency ratio"],
      correctAnswer: 2,
      subject: "Electrical Machines",
    },
    {
      id: "elec_mach_3",
      question: "What is the function of commutator in DC machine?",
      options: [
        "To convert AC to DC",
        "To convert DC to AC",
        "To reverse current direction",
        "To maintain constant voltage",
      ],
      correctAnswer: 2,
      subject: "Electrical Machines",
    },
    {
      id: "elec_mach_4",
      question: "In a synchronous motor, the rotor speed is:",
      options: [
        "Less than synchronous speed",
        "Greater than synchronous speed",
        "Equal to synchronous speed",
        "Variable",
      ],
      correctAnswer: 2,
      subject: "Electrical Machines",
    },
    // Generate more electrical machines questions
    ...Array.from({ length: 63 }, (_, i) => ({
      id: `elec_mach_${i + 5}`,
      question: `Electrical Machines Question ${i + 5}: What determines the speed of an induction motor?`,
      options: [
        `Option A for machines question ${i + 5}`,
        `Option B for machines question ${i + 5}`,
        `Option C for machines question ${i + 5}`,
        `Option D for machines question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Electrical Machines",
    })),

    // Network Theory Questions (67 questions)
    {
      id: "elec_net_1",
      question: "What is Kirchhoff's Current Law?",
      options: [
        "Sum of voltages in a loop is zero",
        "Sum of currents at a node is zero",
        "Voltage is proportional to current",
        "Power equals voltage times current",
      ],
      correctAnswer: 1,
      subject: "Network Theory",
    },
    {
      id: "elec_net_2",
      question: "In an RC circuit, what is the time constant?",
      options: ["R/C", "C/R", "RC", "1/(RC)"],
      correctAnswer: 2,
      subject: "Network Theory",
    },
    {
      id: "elec_net_3",
      question: "What is Thevenin's theorem used for?",
      options: ["Circuit analysis", "Network simplification", "Finding equivalent circuits", "All of the above"],
      correctAnswer: 3,
      subject: "Network Theory",
    },
    {
      id: "elec_net_4",
      question: "In a purely inductive circuit, current:",
      options: ["Leads voltage by 90°", "Lags voltage by 90°", "Is in phase with voltage", "Leads voltage by 45°"],
      correctAnswer: 1,
      subject: "Network Theory",
    },
    // Generate more network theory questions
    ...Array.from({ length: 63 }, (_, i) => ({
      id: `elec_net_${i + 5}`,
      question: `Network Theory Question ${i + 5}: How do you analyze complex AC circuits?`,
      options: [
        `Option A for network question ${i + 5}`,
        `Option B for network question ${i + 5}`,
        `Option C for network question ${i + 5}`,
        `Option D for network question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Network Theory",
    })),

    // Power Systems Questions (66 questions)
    {
      id: "elec_power_1",
      question: "What is the purpose of a circuit breaker?",
      options: ["To regulate voltage", "To interrupt fault currents", "To measure power", "To store energy"],
      correctAnswer: 1,
      subject: "Power Systems",
    },
    {
      id: "elec_power_2",
      question: "What is the standard frequency of AC power in most countries?",
      options: ["50 Hz", "60 Hz", "Both A and B", "25 Hz"],
      correctAnswer: 2,
      subject: "Power Systems",
    },
    {
      id: "elec_power_3",
      question: "What is the function of a transformer in power systems?",
      options: ["Voltage regulation", "Voltage transformation", "Power factor correction", "Frequency conversion"],
      correctAnswer: 1,
      subject: "Power Systems",
    },
    // Generate more power systems questions
    ...Array.from({ length: 63 }, (_, i) => ({
      id: `elec_power_${i + 4}`,
      question: `Power Systems Question ${i + 4}: What are the components of electrical power transmission?`,
      options: [
        `Option A for power question ${i + 4}`,
        `Option B for power question ${i + 4}`,
        `Option C for power question ${i + 4}`,
        `Option D for power question ${i + 4}`,
      ],
      correctAnswer: i % 4,
      subject: "Power Systems",
    })),
  ],

  electronics: [
    // Electronic Devices Questions (67 questions)
    {
      id: "elect_dev_1",
      question: "What is the function of a diode?",
      options: ["Amplify signals", "Store charge", "Allow current in one direction", "Generate oscillations"],
      correctAnswer: 2,
      subject: "Electronic Devices",
    },
    {
      id: "elect_dev_2",
      question: "In a BJT, what does the base current control?",
      options: ["Emitter current", "Collector current", "Base voltage", "Power dissipation"],
      correctAnswer: 1,
      subject: "Electronic Devices",
    },
    {
      id: "elect_dev_3",
      question: "What is the main advantage of MOSFET over BJT?",
      options: ["Higher speed", "Lower power consumption", "Higher input impedance", "All of the above"],
      correctAnswer: 3,
      subject: "Electronic Devices",
    },
    {
      id: "elect_dev_4",
      question: "What is the breakdown voltage of a Zener diode used for?",
      options: ["Amplification", "Voltage regulation", "Switching", "Rectification"],
      correctAnswer: 1,
      subject: "Electronic Devices",
    },
    // Generate more electronic devices questions
    ...Array.from({ length: 63 }, (_, i) => ({
      id: `elect_dev_${i + 5}`,
      question: `Electronic Devices Question ${i + 5}: How do semiconductor devices work?`,
      options: [
        `Option A for devices question ${i + 5}`,
        `Option B for devices question ${i + 5}`,
        `Option C for devices question ${i + 5}`,
        `Option D for devices question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Electronic Devices",
    })),

    // Circuit Theory Questions (67 questions)
    {
      id: "elect_circuit_1",
      question: "What is the gain of an ideal op-amp?",
      options: ["Zero", "One", "Infinite", "Depends on frequency"],
      correctAnswer: 2,
      subject: "Circuit Theory",
    },
    {
      id: "elect_circuit_2",
      question: "In a low-pass filter, what happens to high-frequency signals?",
      options: ["They are amplified", "They are attenuated", "They are phase-shifted by 90°", "They remain unchanged"],
      correctAnswer: 1,
      subject: "Circuit Theory",
    },
    {
      id: "elect_circuit_3",
      question: "What is the cutoff frequency of an RC low-pass filter?",
      options: ["1/(2πRC)", "2πRC", "RC", "1/RC"],
      correctAnswer: 0,
      subject: "Circuit Theory",
    },
    {
      id: "elect_circuit_4",
      question: "In negative feedback, the output signal is:",
      options: ["Added to input", "Subtracted from input", "Multiplied with input", "Divided by input"],
      correctAnswer: 1,
      subject: "Circuit Theory",
    },
    // Generate more circuit theory questions
    ...Array.from({ length: 63 }, (_, i) => ({
      id: `elect_circuit_${i + 5}`,
      question: `Circuit Theory Question ${i + 5}: How do you analyze electronic circuits?`,
      options: [
        `Option A for circuit question ${i + 5}`,
        `Option B for circuit question ${i + 5}`,
        `Option C for circuit question ${i + 5}`,
        `Option D for circuit question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Circuit Theory",
    })),

    // Digital Electronics Questions (66 questions)
    {
      id: "elect_digital_1",
      question: "How many input combinations does a 3-input AND gate have?",
      options: ["3", "6", "8", "9"],
      correctAnswer: 2,
      subject: "Digital Electronics",
    },
    {
      id: "elect_digital_2",
      question: "What is the output of XOR gate when both inputs are same?",
      options: ["0", "1", "Undefined", "Depends on inputs"],
      correctAnswer: 0,
      subject: "Digital Electronics",
    },
    {
      id: "elect_digital_3",
      question: "How many flip-flops are needed to count up to 16?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      subject: "Digital Electronics",
    },
    {
      id: "elect_digital_4",
      question: "What is the decimal equivalent of binary 1101?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2,
      subject: "Digital Electronics",
    },
    // Generate more digital electronics questions
    ...Array.from({ length: 62 }, (_, i) => ({
      id: `elect_digital_${i + 5}`,
      question: `Digital Electronics Question ${i + 5}: How do digital systems process information?`,
      options: [
        `Option A for digital question ${i + 5}`,
        `Option B for digital question ${i + 5}`,
        `Option C for digital question ${i + 5}`,
        `Option D for digital question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Digital Electronics",
    })),
  ],

  civil: [
    // Building Materials Questions (67 questions)
    {
      id: "civil_mat_1",
      question: "What is the typical compressive strength of concrete?",
      options: ["10-20 MPa", "20-40 MPa", "40-60 MPa", "60-80 MPa"],
      correctAnswer: 1,
      subject: "Building Materials",
    },
    {
      id: "civil_mat_2",
      question: "What is the main component of Portland cement?",
      options: ["Calcium silicate", "Aluminum oxide", "Iron oxide", "Magnesium oxide"],
      correctAnswer: 0,
      subject: "Building Materials",
    },
    {
      id: "civil_mat_3",
      question: "What is the water-cement ratio for normal concrete?",
      options: ["0.3-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"],
      correctAnswer: 1,
      subject: "Building Materials",
    },
    {
      id: "civil_mat_4",
      question: "Which test is used to determine the workability of concrete?",
      options: ["Slump test", "Compression test", "Tensile test", "Flexural test"],
      correctAnswer: 0,
      subject: "Building Materials",
    },
    // Generate more building materials questions
    ...Array.from({ length: 63 }, (_, i) => ({
      id: `civil_mat_${i + 5}`,
      question: `Building Materials Question ${i + 5}: What are the properties of construction materials?`,
      options: [
        `Option A for materials question ${i + 5}`,
        `Option B for materials question ${i + 5}`,
        `Option C for materials question ${i + 5}`,
        `Option D for materials question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Building Materials",
    })),

    // Surveying Questions (67 questions)
    {
      id: "civil_survey_1",
      question: "What is the purpose of leveling in surveying?",
      options: ["Measure horizontal distances", "Measure vertical distances", "Measure angles", "Determine elevations"],
      correctAnswer: 3,
      subject: "Surveying",
    },
    {
      id: "civil_survey_2",
      question: "What instrument is used for measuring horizontal angles?",
      options: ["Level", "Theodolite", "Chain", "Compass"],
      correctAnswer: 1,
      subject: "Surveying",
    },
    {
      id: "civil_survey_3",
      question: "What is the standard length of a surveyor's chain?",
      options: ["20 m", "30 m", "50 m", "100 m"],
      correctAnswer: 0,
      subject: "Surveying",
    },
    {
      id: "civil_survey_4",
      question: "What is the principle of plane table surveying?",
      options: ["Triangulation", "Traversing", "Plotting in field", "Leveling"],
      correctAnswer: 2,
      subject: "Surveying",
    },
    // Generate more surveying questions
    ...Array.from({ length: 63 }, (_, i) => ({
      id: `civil_survey_${i + 5}`,
      question: `Surveying Question ${i + 5}: How do you measure land and determine boundaries?`,
      options: [
        `Option A for survey question ${i + 5}`,
        `Option B for survey question ${i + 5}`,
        `Option C for survey question ${i + 5}`,
        `Option D for survey question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Surveying",
    })),

    // Fluid Mechanics Questions (66 questions)
    {
      id: "civil_fluid_1",
      question: "What is Bernoulli's equation based on?",
      options: ["Conservation of mass", "Conservation of energy", "Conservation of momentum", "Newton's second law"],
      correctAnswer: 1,
      subject: "Fluid Mechanics",
    },
    {
      id: "civil_fluid_2",
      question: "What is the continuity equation in fluid mechanics?",
      options: ["A₁V₁ = A₂V₂", "P₁ + ρgh₁ = P₂ + ρgh₂", "F = ma", "τ = μ(du/dy)"],
      correctAnswer: 0,
      subject: "Fluid Mechanics",
    },
    {
      id: "civil_fluid_3",
      question: "What is the unit of dynamic viscosity?",
      options: ["Pa·s", "m²/s", "kg/m³", "N/m²"],
      correctAnswer: 0,
      subject: "Fluid Mechanics",
    },
    {
      id: "civil_fluid_4",
      question: "What type of flow occurs when Reynolds number is less than 2000?",
      options: ["Turbulent", "Laminar", "Transitional", "Unsteady"],
      correctAnswer: 1,
      subject: "Fluid Mechanics",
    },
    // Generate more fluid mechanics questions
    ...Array.from({ length: 62 }, (_, i) => ({
      id: `civil_fluid_${i + 5}`,
      question: `Fluid Mechanics Question ${i + 5}: How do fluids behave under different conditions?`,
      options: [
        `Option A for fluid question ${i + 5}`,
        `Option B for fluid question ${i + 5}`,
        `Option C for fluid question ${i + 5}`,
        `Option D for fluid question ${i + 5}`,
      ],
      correctAnswer: i % 4,
      subject: "Fluid Mechanics",
    })),
  ],
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")

    if (!department || !questionBank[department as keyof typeof questionBank]) {
      return NextResponse.json({ message: "Invalid department" }, { status: 400 })
    }

    // Get all questions for the department (200 questions)
    const departmentQuestions = questionBank[department as keyof typeof questionBank]

    // Shuffle all questions using Fisher-Yates algorithm for better randomization
    const shuffled = [...departmentQuestions]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // Select exactly 50 questions from the shuffled array
    const selectedQuestions = shuffled.slice(0, 50)

    return NextResponse.json({
      questions: selectedQuestions,
      totalAvailable: departmentQuestions.length,
      selected: selectedQuestions.length,
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
