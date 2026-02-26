import { Lab } from './types';

export const LABS: Lab[] = [
  {
    id: 'enzyme-action',
    title: 'Enzyme Action',
    category: 'Biochemistry',
    description: 'Investigate the effect of pH and temperature on catalase activity.',
    icon: 'Beaker',
    color: 'rose',
    theory: `### Enzyme Action & Catalase
Enzymes are biological catalysts that speed up chemical reactions without being consumed. They work by lowering the activation energy required for a reaction to occur.

**The Lock and Key Hypothesis:**
The substrate fits into the complementary active site of the enzyme, forming an enzyme-substrate complex.

**Curriculum-Specific Experiments:**
*   **IGCSE / MYP / GCSE:**
    *   **Catalase Activity:** Using potato or liver discs in Hydrogen Peroxide ($H_2O_2$) to measure oxygen bubble production.
    *   **Amylase & Starch:** Investigating the effect of pH on the time taken for amylase to break down starch (using Iodine test).
    *   **Protease & Milk:** Measuring the time taken for protease (like trypsin) to clear a cloudy milk suspension.
*   **IBDP / A-Level / AP Biology:**
    *   **Vmax and Km:** Investigating substrate concentration effects on the rate of reaction.
    *   **Inhibition:** Effect of competitive and non-competitive inhibitors on enzyme kinetics.
    *   **Immobilized Enzymes:** Using yeast beads in alginate to investigate lactose breakdown.
    *   **Activation Energy:** Using data to calculate $Q_{10}$ temperature coefficients.

**The Reaction in this Lab:**
$$2H_2O_2 \\xrightarrow{\\text{Catalase}} 2H_2O + O_2 (\\text{bubbles})$$`,
    method: `### 1. Research Question
How does changing the **pH** or **Temperature** affect the rate of catalase activity?

### 2. Hypothesis
If the temperature increases towards the optimum (37°C), then the rate of oxygen production will increase because the kinetic energy of the molecules increases, leading to more frequent and successful collisions between the enzyme's active site and the substrate.

### 3. Procedure
1. **Setup:** Adjust the **Temperature** and **pH** using the sliders.
2. **Observe:** Watch the enzyme and substrate interactions. Notice how high temperatures cause the active site to denature (change shape).
3. **Manual Count:** 
    *   Start the **Timer** (set for 1 minute).
    *   Count the number of oxygen bubbles produced in the reaction vessel.
    *   Enter your count into the **Manual Record** field.
4. **Analysis:** Click **'Record Manually'** to add your observation to the graph.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Change the Temperature or pH systematically (e.g., every 10°C or 1 pH unit).
*   **Controlled Variables (CV):** Ensure enzyme concentration, substrate volume, and reaction time remain constant for every trial.

### 3. Reliability & Accuracy
*   **Multiple Trials:** Repeat each condition at least **three times**.
*   **Mean Calculation:** Calculate the average rate for each condition.
*   **Anomalies:** Identify any results that deviate significantly from the trend and exclude them from the mean calculation.

### 4. Safety Precautions
*   **Hydrogen Peroxide:** $H_2O_2$ is corrosive; wear safety goggles and gloves.
*   **Glassware:** Handle beakers and syringes carefully to avoid breakage.
*   **Heat:** Use tongs when handling hot water baths.

### 5. Suggested Improvements
*   **Digital Measurement:** Use a gas pressure sensor or a digital gas syringe for more precise volume readings than manual bubble counting.
*   **Thermostatic Water Bath:** Use an electronic water bath to maintain a more precise and stable temperature throughout the experiment.`,
    independentVariables: [
      { id: 'temp', name: 'Temperature', min: 0, max: 100, step: 1, defaultValue: 37, unit: '°C' },
      { id: 'ph', name: 'pH', min: 1, max: 14, step: 0.5, defaultValue: 7, unit: '' }
    ],
    dependentVariable: { name: 'rate', unit: 'cm³/min', label: 'Rate of O₂ Production' },
    controlledVariables: ['Enzyme Concentration', 'Substrate Concentration', 'Volume of Solution'],
    safetyOptions: [
      { id: 'goggles', text: 'Wear safety goggles to protect eyes from H₂O₂', isCorrect: true },
      { id: 'gloves', text: 'Wear gloves when handling corrosive Hydrogen Peroxide', isCorrect: true },
      { id: 'taste', text: 'Taste the solution to check for oxygen production', isCorrect: false },
      { id: 'tongs', text: 'Use tongs for handling hot beakers', isCorrect: true }
    ]
  },
  {
    id: 'osmosis',
    title: 'Osmosis in Potatoes',
    category: 'Cell Biology',
    description: 'Measure mass change of potato tubers in varying sucrose concentrations.',
    icon: 'Droplets',
    color: 'blue',
    theory: `### Osmosis
Osmosis is the net movement of water molecules from a region of higher water potential (dilute solution) to a region of lower water potential (concentrated solution), through a partially permeable membrane.

**Key Concepts:**
*   **Water Potential ($\Psi$):** Pure water has the highest water potential (0 kPa). Adding solutes lowers the water potential (makes it more negative).
*   **Turgidity:** In dilute solutions, plant cells take in water and become turgid, providing structural support.
*   **Plasmolysis:** In concentrated solutions, water leaves the cell, the vacuole shrinks, and the cytoplasm pulls away from the cell wall.

**The Percentage Change Formula:**
$$\% \text{ Change in Mass} = \frac{\text{Final Mass} - \text{Initial Mass}}{\text{Initial Mass}} \times 100$$

**Curriculum-Specific Experiments:**
*   **IGCSE / MYP:** Measuring the change in mass of potato cylinders in different sucrose concentrations.
*   **IBDP / A-Level:** Determining the **Isotonic Point** (where there is no net change in mass).`,
    method: `### 1. Research Question
How does the concentration of sucrose solution affect the percentage change in mass of potato cylinders?

### 2. Hypothesis
If the sucrose concentration increases, then the percentage change in mass will decrease (become more negative) because water moves out of the potato cells by osmosis from a region of higher water potential to a region of lower water potential through a partially permeable membrane.

### 3. Procedure
1. **Initial Mass:** Click **'Measure Initial Mass'** to place a fresh potato cylinder on the electronic balance and record its starting weight ($m_i$).
2. **Submerge:** Click **'Submerge in Solution'** to place the potato into the beaker containing the selected sucrose concentration.
3. **Timer:** Start the **Timer** (set for 1 minute or more).
4. **Dry:** Click **'Remove from Solution'**, then click **'Dry with Cloth'** to remove excess surface water. This ensures you are only measuring the change in internal mass.
5. **Final Mass:** Click **'Measure Final Mass'** to move the dried potato back to the balance and record its final weight ($m_f$).
6. **Calculate:** Use the formula to calculate the percentage change in mass.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Change the Sucrose Concentration (e.g., 0.0M, 0.2M, 0.4M, etc.).
*   **Controlled Variables (CV):** Use potato cylinders from the same potato (same age/type), ensure they are cut to the same length/diameter, and submerge them for the same duration.

### 3. Reliability & Accuracy
*   **Multiple Trials:** Use at least **three potato cylinders** for each concentration.
*   **Mean Calculation:** Calculate the average % change for each concentration to improve reliability.
*   **Anomalies:** Discard any cylinder that shows a mass change significantly different from the others in the same group.

### 4. Safety Precautions
*   **Cutting Tools:** Use a cork borer and scalpel carefully on a cutting mat to avoid injury.
*   **Glassware:** Handle beakers with care; clean up spills immediately to prevent slipping.

### 5. Suggested Improvements
*   **Digital Balance:** Use a balance with higher precision (e.g., 3 decimal places) for more accurate mass readings.
*   **Temperature Control:** Perform the experiment in a temperature-controlled room or water bath, as temperature affects the rate of osmosis.`,
    independentVariables: [
      { id: 'molarity', name: 'Sucrose Concentration', min: 0, max: 1, step: 0.1, defaultValue: 0, unit: 'M' }
    ],
    dependentVariable: { name: 'massChange', unit: '%', label: 'Percentage Change in Mass' },
    controlledVariables: ['Initial Mass of Potato', 'Initial Length of Potato', 'Surface Area of Potato', 'Temperature', 'Volume of Solution'],
    safetyOptions: [
      { id: 'mat', text: 'Use a cutting mat when using the cork borer', isCorrect: true },
      { id: 'scalpel', text: 'Always cut away from your body with the scalpel', isCorrect: true },
      { id: 'spills', text: 'Wipe up sucrose spills to prevent slippery surfaces', isCorrect: true },
      { id: 'running', text: 'Run in the lab to get results faster', isCorrect: false }
    ]
  },
  {
    id: 'photosynthesis',
    title: 'Photosynthesis Rate',
    category: 'Physiology',
    description: 'Light intensity vs. bubble rate from Elodea (pondweed).',
    icon: 'Sun',
    color: 'emerald',
    theory: `### Photosynthesis
Photosynthesis is the process by which plants synthesize glucose from $CO_2$ and water using light energy. Chlorophyll in the chloroplasts absorbs light energy.

**The Equation:**
$$6CO_2 + 6H_2O \\xrightarrow{\\text{Light}} C_6H_{12}O_6 + 6O_2$$

**Factors Affecting Rate:**
*   **Light Intensity:** Provides energy for the light-dependent reaction.
*   **$CO_2$ Concentration:** A substrate for the light-independent reaction.
*   **Temperature:** Affects the enzymes involved (e.g., Rubisco).

**Curriculum-Specific Experiments:**
*   **IGCSE / MYP:** 
    *   Investigating the effect of light intensity on the rate of photosynthesis by counting bubbles from pondweed (Elodea).
    *   Testing leaves for starch to prove photosynthesis occurred.
*   **IBDP / A-Level:**
    *   **Action and Absorption Spectra:** Using different colored filters to see which wavelengths are most effective.
    *   **Limiting Factors:** Identifying which factor is limiting the rate at different points on a graph.
    *   **Chromatography:** Separating photosynthetic pigments ($Rf$ values).`,
    method: `### 1. Research Question
How does light intensity affect the rate of photosynthesis in pondweed (Elodea)?

### 2. Hypothesis
If the light intensity increases, then the number of oxygen bubbles produced per minute will increase because light provides the energy required for the light-dependent stage of photosynthesis, increasing the overall rate of reaction.

### 3. Procedure
1. **Setup:** Adjust the **Light Intensity**, **Temperature**, and **CO₂ Concentration** using the sliders.
2. **Observe:** Watch the pondweed in the water bath. Notice the oxygen bubbles being released from the cut stem and rising into the test tube.
3. **Manual Count:** 
    *   Start the **Timer** (set for 1 minute).
    *   Count the number of bubbles produced using the **Tally** button.
4. **Analysis:** Observe how the rate changes when you modify different limiting factors.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Change one factor (e.g., Light Intensity) while keeping others (Temperature, CO₂ Concentration) constant.
*   **Controlled Variables (CV):** Use the same piece of pondweed, the same volume of water, and the same wavelength of light.

### 3. Reliability & Accuracy
*   **Multiple Trials:** Repeat the bubble count at each light intensity at least **three times**.
*   **Mean Calculation:** Calculate the average bubbles per minute for each condition.
*   **Equilibration:** Allow the pondweed to adjust to new conditions for 5 minutes before starting the count.

### 4. Safety Precautions
*   **Electrical Safety:** Keep the lamp and electrical cords away from the water bath to prevent shocks.
*   **Heat:** Be careful as the lamp can become very hot during the experiment.
*   **Glassware:** Handle the water bath and test tubes carefully.

### 5. Suggested Improvements
*   **Gas Collection:** Use a gas syringe or a capillary tube with a ruler to measure the actual volume of oxygen produced, which is more accurate than bubble counting.
*   **LED Lamp:** Use an LED lamp to minimize heat transfer to the water bath, ensuring temperature remains a controlled variable.`,
    independentVariables: [
      { id: 'light', name: 'Light Intensity', min: 0, max: 100, step: 5, defaultValue: 50, unit: '%' },
      { id: 'temp', name: 'Temperature', min: 10, max: 50, step: 1, defaultValue: 25, unit: '°C' },
      { id: 'co2', name: 'CO₂ Concentration', min: 0, max: 1, step: 0.05, defaultValue: 0.1, unit: '%' }
    ],
    dependentVariable: { name: 'bubbles', unit: 'bubbles/min', label: 'Number of Oxygen Bubbles Produced' },
    controlledVariables: ['Type of Pondweed', 'Water Volume', 'Light Wavelength'],
    safetyOptions: [
      { id: 'water_elec', text: 'Keep electrical equipment away from water', isCorrect: true },
      { id: 'hot_lamp', text: 'Do not touch the lamp bulb as it may be hot', isCorrect: true },
      { id: 'wet_hands', text: 'Dry hands before touching the light switch', isCorrect: true },
      { id: 'drink', text: 'Drink the water bath water if thirsty', isCorrect: false }
    ]
  },
  {
    id: 'respiration',
    title: 'Cellular Respiration',
    category: 'Physiology',
    description: 'Respirometer measuring O2 consumption in germinating seeds.',
    icon: 'Wind',
    color: 'amber',
    theory: `### Respiration
Respiration is the chemical process that releases energy from glucose. Aerobic respiration uses oxygen.`,
    method: `### 1. Research Question
How does temperature affect the rate of oxygen consumption in germinating seeds?

### 2. Hypothesis
If the temperature increases, then the rate of oxygen uptake will increase because respiratory enzymes work faster at higher temperatures (due to increased kinetic energy) until they reach their optimum temperature.

### 3. Procedure
1. Set the temperature of the water bath.
2. Observe the movement of the manometer fluid.
3. Calculate the rate of oxygen uptake.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Temperature.
*   **Controlled Variables (CV):** Mass of seeds, volume of KOH.

### 3. Reliability & Accuracy
*   Repeat 3 times and calculate mean. Exclude anomalies.

### 4. Safety Precautions
*   **KOH:** Potassium Hydroxide is corrosive; wear goggles and gloves.
*   **Living Organisms:** Handle seeds with care.

### 5. Suggested Improvements
*   Use a digital respirometer for more precise volume changes.`,
    independentVariables: [
      { id: 'temp', name: 'Temperature', min: 5, max: 45, step: 1, defaultValue: 25, unit: '°C' }
    ],
    dependentVariable: { name: 'o2_uptake', unit: 'mm³/min', label: 'O₂ Consumption Rate' },
    controlledVariables: ['Mass of Seeds', 'Volume of KOH', 'Time'],
    safetyOptions: [
      { id: 'koh_safety', text: 'Wear goggles when handling KOH', isCorrect: true },
      { id: 'seeds_care', text: 'Handle germinating seeds gently', isCorrect: true },
      { id: 'eat_seeds', text: 'Eat the seeds to test for energy', isCorrect: false }
    ]
  },
  {
    id: 'transpiration',
    title: 'Transpiration Rate',
    category: 'Physiology',
    description: 'Potometer measuring water uptake under varying conditions.',
    icon: 'Leaf',
    color: 'teal',
    theory: `### Transpiration
Transpiration is the loss of water vapor from the leaves of a plant through the stomata.`,
    method: `### 1. Research Question
How does wind speed or humidity affect the rate of transpiration in a leafy shoot?

### 2. Hypothesis
If the wind speed increases, then the rate of water uptake will increase because wind removes the water vapor boundary layer from the leaf surface, maintaining a steeper concentration gradient for diffusion.

### 3. Procedure
1. Adjust environmental factors like wind speed or humidity.
2. Measure the distance moved by the air bubble in the potometer.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Wind speed or Humidity.
*   **Controlled Variables (CV):** Light intensity, Temperature.

### 3. Reliability & Accuracy
*   Repeat 3 times and calculate mean. Exclude anomalies.

### 4. Safety Precautions
*   **Glassware:** Potometers are fragile; handle with care.
*   **Water:** Clean up spills to prevent slipping.

### 5. Suggested Improvements
*   Use a digital potometer for more precise water uptake readings.`,
    independentVariables: [
      { id: 'wind', name: 'Wind Speed', min: 0, max: 10, step: 1, defaultValue: 0, unit: 'm/s' },
      { id: 'humidity', name: 'Humidity', min: 20, max: 100, step: 5, defaultValue: 50, unit: '%' },
      { id: 'temp', name: 'Temperature', min: 10, max: 50, step: 1, defaultValue: 25, unit: '°C' },
      { id: 'light', name: 'Light Intensity', min: 0, max: 100, step: 5, defaultValue: 50, unit: '%' }
    ],
    dependentVariable: { name: 'water_uptake', unit: 'mm/min', label: 'Rate of Water Uptake' },
    controlledVariables: ['Leaf Surface Area'],
    safetyOptions: [
      { id: 'glass_care', text: 'Handle the fragile glass potometer with care', isCorrect: true },
      { id: 'spill_wipe', text: 'Wipe up water spills immediately', isCorrect: true },
      { id: 'wind_eye', text: 'Avoid looking directly into the fan', isCorrect: true }
    ]
  },
  {
    id: 'membrane-permeability',
    title: 'Membrane Permeability',
    category: 'Cell Biology',
    description: 'Effect of temperature on beetroot pigment leakage.',
    icon: 'Layers',
    color: 'violet',
    theory: `### Cell Membranes
Cell membranes are composed of a phospholipid bilayer with embedded proteins. High temperatures can damage these structures.`,
    method: `### 1. Research Question
How does temperature affect the permeability of beetroot cell membranes?

### 2. Hypothesis
If the temperature increases, then the absorbance of the solution will increase because high temperatures damage the phospholipid bilayer and denature membrane proteins, allowing more pigment (betalain) to leak out of the vacuole.

### 3. Procedure
1. Place beetroot discs in water at different temperatures.
2. Use a colorimeter to measure the intensity of the leaked pigment (betalain).

### 2. Variable Manipulation
*   **Independent Variable (IV):** Temperature.
*   **Controlled Variables (CV):** Size of beetroot discs, volume of water.

### 3. Reliability & Accuracy
*   Repeat 3 times and calculate mean. Exclude anomalies.

### 4. Safety Precautions
*   **Heat:** Use tongs for hot water baths.
*   **Cutting:** Use a cutting mat for beetroot discs.

### 5. Suggested Improvements
*   Use a digital colorimeter for more precise absorbance readings.`,
    independentVariables: [
      { id: 'temp', name: 'Temperature', min: 20, max: 80, step: 5, defaultValue: 20, unit: '°C' }
    ],
    dependentVariable: { name: 'absorbance', unit: 'AU', label: 'Absorbance (Pigment Intensity)' },
    controlledVariables: ['Size of Beetroot Discs', 'Volume of Water', 'Time'],
    safetyOptions: [
      { id: 'tongs_heat', text: 'Use tongs when handling hot test tubes', isCorrect: true },
      { id: 'cut_mat', text: 'Use a cutting mat when preparing beetroot', isCorrect: true },
      { id: 'stain_clothes', text: 'Wear a lab coat to prevent beetroot stains', isCorrect: true }
    ]
  },
  {
    id: 'mitotic-index',
    title: 'Mitotic Index',
    category: 'Cell Biology',
    description: 'Calculate the ratio of cells in mitosis in a root tip squash.',
    icon: 'Microscope',
    color: 'cyan',
    theory: `### Mitosis
Mitosis is the process of cell division that results in two genetically identical daughter cells.`,
    method: `### 1. Research Question
How does the field of view (distance from the root tip) affect the mitotic index in garlic roots?

### 2. Hypothesis
If the observation is made closer to the root tip (meristematic region), then the mitotic index will be higher because this is the primary region of active cell division and growth in the plant.

### 3. Procedure
1. Scan the virtual slide of the garlic root tip.
2. Count the number of cells in each stage of mitosis vs. interphase.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Field of View.
*   **Controlled Variables (CV):** Staining technique, magnification.

### 3. Reliability & Accuracy
*   Count at least 100 cells to ensure a representative sample.

### 4. Safety Precautions
*   **Stains:** Acetic orcein is corrosive; wear goggles and gloves.
*   **Glassware:** Handle slides and coverslips carefully.

### 5. Suggested Improvements
*   Use high-resolution digital imaging for more accurate cell identification.`,
    independentVariables: [
      { id: 'field', name: 'Field of View', min: 1, max: 5, step: 1, defaultValue: 1, unit: '#' }
    ],
    dependentVariable: { name: 'index', unit: '%', label: 'Mitotic Index' },
    controlledVariables: ['Staining Technique', 'Magnification'],
    safetyOptions: [
      { id: 'stain_safety', text: 'Wear goggles when using corrosive stains', isCorrect: true },
      { id: 'slide_care', text: 'Handle sharp glass slides with care', isCorrect: true },
      { id: 'micro_light', text: 'Do not set microscope light too bright', isCorrect: true }
    ]
  },
  {
    id: 'natural-selection',
    title: 'Natural Selection',
    category: 'Ecology',
    description: 'Peppered moth simulation across different environments.',
    icon: 'Dna',
    color: 'orange',
    theory: `### Natural Selection
Natural selection is the process where organisms better adapted to their environment tend to survive and produce more offspring.`,
    method: `### 1. Research Question
How does environmental pollution affect the frequency of dark-colored moths in a population over time?

### 2. Hypothesis
If the pollution level increases (darkening the trees), then the frequency of dark moths will increase because they are better camouflaged from predators, giving them a selective advantage and a higher survival rate.

### 3. Procedure
1. Select the background color (Light/Dark).
2. Release a mixed population of moths.
3. Observe the survival rates over generations.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Pollution level.
*   **Controlled Variables (CV):** Initial population size.

### 3. Reliability & Accuracy
*   Repeat the simulation multiple times to account for random variation.

### 4. Safety Precautions
*   **Computer Safety:** Take breaks from the screen to avoid eye strain.

### 5. Suggested Improvements
*   Include more environmental variables like temperature or predator types.`,
    independentVariables: [
      { id: 'pollution', name: 'Pollution Level', min: 0, max: 100, step: 10, defaultValue: 0, unit: '%' }
    ],
    dependentVariable: { name: 'dark_freq', unit: '%', label: 'Frequency of Dark Morph' },
    controlledVariables: ['Initial Population Size', 'Predation Pressure'],
    safetyOptions: [
      { id: 'eye_strain', text: 'Take regular breaks from the screen', isCorrect: true },
      { id: 'posture', text: 'Maintain good posture while using the computer', isCorrect: true }
    ]
  },
  {
    id: 'energy-flow',
    title: 'Energy Flow',
    category: 'Ecology',
    description: 'Trophic level pyramids and the 10% rule.',
    icon: 'Zap',
    color: 'yellow',
    theory: `### Trophic Levels
Energy flows through an ecosystem from producers to consumers. Only about 10% of energy is transferred to the next level.`,
    method: `### 1. Research Question
How does the primary productivity of an ecosystem affect the energy available at higher trophic levels?

### 2. Hypothesis
If the primary production increases, then the energy at the tertiary level will increase because there is more total energy entering the food chain to be transferred, even though approximately 90% is lost at each level.

### 3. Procedure
1. Input the primary productivity.
2. Calculate the energy available at each subsequent trophic level.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Primary production.
*   **Controlled Variables (CV):** Transfer efficiency.

### 3. Reliability & Accuracy
*   Use precise mathematical models for energy transfer.

### 4. Safety Precautions
*   **Data Accuracy:** Ensure all calculations are double-checked.

### 5. Suggested Improvements
*   Model more complex food webs instead of simple chains.`,
    independentVariables: [
      { id: 'input', name: 'Primary Production', min: 1000, max: 10000, step: 500, defaultValue: 5000, unit: 'kJ' }
    ],
    dependentVariable: { name: 'tertiary', unit: 'kJ', label: 'Energy at Tertiary Level' },
    controlledVariables: ['Transfer Efficiency'],
    safetyOptions: [
      { id: 'calc_check', text: 'Double-check all energy calculations', isCorrect: true }
    ]
  },
  {
    id: 'ventilation',
    title: 'Ventilation & Exercise',
    category: 'Physiology',
    description: 'Breathing rate and tidal volume at rest vs exercise.',
    icon: 'Activity',
    color: 'red',
    theory: `### Ventilation
Ventilation is the movement of air into and out of the lungs. Exercise increases the demand for oxygen.`,
    method: `### 1. Research Question
How does exercise intensity affect the ventilation rate in humans?

### 2. Hypothesis
If the exercise intensity increases, then the ventilation rate will increase because the body needs to supply more oxygen to muscles for aerobic respiration and remove the excess carbon dioxide produced.

### 3. Procedure
1. Set the exercise intensity.
2. Measure the breathing rate (breaths/min) and tidal volume.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Exercise intensity.
*   **Controlled Variables (CV):** Age, fitness level.

### 3. Reliability & Accuracy
*   Repeat 3 times and calculate mean. Exclude anomalies.

### 4. Safety Precautions
*   **Physical Strain:** Do not overexert yourself during physical tests.
*   **Hygiene:** Use clean mouthpieces for spirometers.

### 5. Suggested Improvements
*   Use a digital spirometer for more accurate tidal volume readings.`,
    independentVariables: [
      { id: 'intensity', name: 'Exercise Intensity', min: 0, max: 100, step: 10, defaultValue: 0, unit: '%' }
    ],
    dependentVariable: { name: 'vent_rate', unit: 'L/min', label: 'Ventilation Rate' },
    controlledVariables: ['Age', 'Fitness Level', 'Ambient Temperature'],
    safetyOptions: [
      { id: 'overexert', text: 'Stop exercising if you feel dizzy or faint', isCorrect: true },
      { id: 'mouthpiece', text: 'Use a clean, sterile mouthpiece for the spirometer', isCorrect: true },
      { id: 'warm_up', text: 'Warm up before starting intense exercise', isCorrect: true }
    ]
  },
  {
    id: 'nerve-impulses',
    title: 'Nerve Impulses',
    category: 'Physiology',
    description: 'Oscilloscope traces of Action Potentials.',
    icon: 'Zap',
    color: 'indigo',
    theory: `### Action Potentials
An action potential is a rapid rise and subsequent fall in voltage or membrane potential across a cellular membrane.`,
    method: `### 1. Research Question
How does stimulus strength affect the peak membrane potential of a neuron?

### 2. Hypothesis
If the stimulus strength reaches the threshold, then an action potential will fire; however, increasing stimulus beyond threshold does not increase peak potential because action potentials follow the 'all-or-nothing' principle.

### 3. Procedure
1. Apply a stimulus of varying voltage.
2. Observe if the threshold is reached and an action potential is fired.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Stimulus strength.
*   **Controlled Variables (CV):** Ion concentrations, temperature.

### 3. Reliability & Accuracy
*   Repeat multiple times to find the exact threshold voltage.

### 4. Safety Precautions
*   **Electrical Safety:** Use low voltages to avoid tissue damage in real experiments.

### 5. Suggested Improvements
*   Model the effect of myelination on conduction speed.`,
    independentVariables: [
      { id: 'stimulus', name: 'Stimulus Strength', min: 0, max: 100, step: 5, defaultValue: 0, unit: 'mV' }
    ],
    dependentVariable: { name: 'peak', unit: 'mV', label: 'Peak Membrane Potential' },
    controlledVariables: ['Ion Concentrations', 'Temperature'],
    safetyOptions: [
      { id: 'low_volt', text: 'Use low voltages to prevent nerve damage', isCorrect: true }
    ]
  },
  {
    id: 'genetics',
    title: 'Genetics Simulator',
    category: 'Genetics',
    description: 'Monohybrid and Dihybrid Punnett Square simulator.',
    icon: 'Dna',
    color: 'purple',
    theory: `### Mendelian Genetics
Inheritance of traits follows specific patterns based on dominant and recessive alleles.`,
    method: `### 1. Research Question
How do parental genotypes affect the phenotypic ratios of offspring in a monohybrid cross?

### 2. Hypothesis
If both parents are heterozygous (Aa), then the phenotypic ratio of the offspring will be 3:1 (dominant:recessive) because of the random segregation of alleles during meiosis.

### 3. Procedure
1. Select the genotypes of the parents.
2. Generate the offspring and observe the phenotypic ratios.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Parental genotypes.
*   **Controlled Variables (CV):** Sample size.

### 3. Reliability & Accuracy
*   Use a large sample size (e.g., 1000 offspring) to match theoretical ratios.

### 4. Safety Precautions
*   **Data Integrity:** Ensure all crosses are recorded accurately.

### 5. Suggested Improvements
*   Include sex-linked traits and gene linkage in the simulation.`,
    independentVariables: [
      { id: 'cross', name: 'Cross Type', min: 1, max: 2, step: 1, defaultValue: 1, unit: 'Type' }
    ],
    dependentVariable: { name: 'ratio', unit: '', label: 'Dominant Phenotype %' },
    controlledVariables: ['Sample Size'],
    safetyOptions: [
      { id: 'large_sample', text: 'Use a large sample size for reliable ratios', isCorrect: true }
    ]
  },
  {
    id: 'chromatography',
    title: 'Leaf Chromatography',
    category: 'Biochemistry',
    description: 'Rf value calculation for leaf pigments.',
    icon: 'Palette',
    color: 'pink',
    theory: `### Chromatography
Chromatography is used to separate the components of a mixture based on their solubility and affinity for the stationary phase.`,
    method: `### 1. Research Question
How does solvent polarity affect the Rf values of different leaf pigments?

### 2. Hypothesis
If the solvent polarity increases, then the Rf values of polar pigments will increase because they will have a higher solubility in the mobile phase and travel further up the paper.

### 3. Procedure
1. Select the solvent type.
2. Run the chromatogram and measure the distance moved by each pigment.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Solvent polarity.
*   **Controlled Variables (CV):** Paper type, temperature.

### 3. Reliability & Accuracy
*   Repeat 3 times and calculate mean Rf values.

### 4. Safety Precautions
*   **Solvents:** Many solvents are flammable and toxic; use in a fume cupboard.
*   **Fire:** Keep away from naked flames.

### 5. Suggested Improvements
*   Use Two-Dimensional chromatography for better separation of similar pigments.`,
    independentVariables: [
      { id: 'solvent', name: 'Solvent Polarity', min: 1, max: 5, step: 1, defaultValue: 3, unit: 'Scale' }
    ],
    dependentVariable: { name: 'rf', unit: '', label: 'Rf Value of Chlorophyll a' },
    controlledVariables: ['Paper Type', 'Temperature'],
    safetyOptions: [
      { id: 'fume_hood', text: 'Use a fume cupboard for volatile solvents', isCorrect: true },
      { id: 'no_flame', text: 'Keep flammable solvents away from Bunsen burners', isCorrect: true },
      { id: 'solvent_skin', text: 'Avoid skin contact with organic solvents', isCorrect: true }
    ]
  },
  {
    id: 'speciation',
    title: 'Speciation',
    category: 'Ecology',
    description: 'Reproductive isolation in island populations.',
    icon: 'Globe',
    color: 'lime',
    theory: `### Speciation
Speciation occurs when populations of the same species become isolated and evolve independently.`,
    method: `### 1. Research Question
How does the duration of geographic isolation affect the genetic divergence between two populations?

### 2. Hypothesis
If the isolation time increases, then the genetic divergence will increase because mutations and natural selection act independently on each population without gene flow to homogenize the gene pool.

### 3. Procedure
1. Set the degree of geographic isolation.
2. Observe the divergence in traits over time.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Isolation time.
*   **Controlled Variables (CV):** Mutation rate.

### 3. Reliability & Accuracy
*   Repeat multiple times to observe different evolutionary paths.

### 4. Safety Precautions
*   **Scientific Ethics:** Consider the implications of genetic manipulation.

### 5. Suggested Improvements
*   Model the effect of bottleneck events and genetic drift.`,
    independentVariables: [
      { id: 'isolation', name: 'Isolation Time', min: 0, max: 1000, step: 50, defaultValue: 0, unit: 'Gen' }
    ],
    dependentVariable: { name: 'divergence', unit: '%', label: 'Genetic Divergence' },
    controlledVariables: ['Mutation Rate', 'Selection Pressure'],
    safetyOptions: [
      { id: 'ethics', text: 'Consider ethical implications of genetic studies', isCorrect: true }
    ]
  },
  {
    id: 'hormone-control',
    title: 'Hormone Control',
    category: 'Physiology',
    description: 'Feedback loops of Glucose and Insulin.',
    icon: 'Syringe',
    color: 'fuchsia',
    theory: `### Homeostasis
Homeostasis is the maintenance of a constant internal environment. Blood glucose is regulated by insulin and glucagon.`,
    method: `### 1. Research Question
How does glucose intake affect the blood insulin concentration over time?

### 2. Hypothesis
If glucose intake increases, then the insulin concentration will increase because the pancreas detects high blood sugar and secretes insulin to stimulate glucose uptake by body cells.

### 3. Procedure
1. Simulate a meal (glucose intake).
2. Observe the response of the pancreas and the resulting blood glucose levels.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Glucose intake.
*   **Controlled Variables (CV):** Initial insulin level.

### 3. Reliability & Accuracy
*   Repeat 3 times and calculate mean. Exclude anomalies.

### 4. Safety Precautions
*   **Medical Safety:** Do not perform glucose tolerance tests without medical supervision.

### 5. Suggested Improvements
*   Model the difference between Type 1 and Type 2 Diabetes.`,
    independentVariables: [
      { id: 'intake', name: 'Glucose Intake', min: 0, max: 100, step: 10, defaultValue: 0, unit: 'g' }
    ],
    dependentVariable: { name: 'glucose', unit: 'mmol/L', label: 'Blood Glucose Level' },
    controlledVariables: ['Initial Insulin Level', 'Metabolic Rate'],
    safetyOptions: [
      { id: 'med_super', text: 'Perform medical tests only under supervision', isCorrect: true }
    ]
  },
  {
    id: 'kidney-function',
    title: 'Kidney Function',
    category: 'Physiology',
    description: 'ADH levels and Osmoregulation.',
    icon: 'Droplet',
    color: 'sky',
    theory: `### Osmoregulation
The kidneys regulate the water potential of the blood by controlling the amount of water reabsorbed in the collecting duct.`,
    method: `### 1. Research Question
How does water intake affect the volume and concentration of urine produced?

### 2. Hypothesis
If water intake increases, then the urine volume will increase because the pituitary gland secretes less ADH, making the collecting ducts of the kidney less permeable to water reabsorption.

### 3. Procedure
1. Adjust the water intake.
2. Observe the change in ADH concentration and urine volume.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Water intake.
*   **Controlled Variables (CV):** Salt intake.

### 3. Reliability & Accuracy
*   Repeat 3 times and calculate mean. Exclude anomalies.

### 4. Safety Precautions
*   **Water Intoxication:** Do not consume excessive amounts of water in a short period.

### 5. Suggested Improvements
*   Model the effect of caffeine or alcohol on ADH production.`,
    independentVariables: [
      { id: 'water', name: 'Water Intake', min: 0, max: 2000, step: 100, defaultValue: 500, unit: 'ml' }
    ],
    dependentVariable: { name: 'urine', unit: 'ml', label: 'Urine Volume' },
    controlledVariables: ['Salt Intake', 'Exercise Level'],
    safetyOptions: [
      { id: 'water_tox', text: 'Avoid excessive water consumption (water intoxication)', isCorrect: true }
    ]
  },
  {
    id: 'limiting-factors',
    title: 'Limiting Factors',
    category: 'Physiology',
    description: 'CO2 concentration vs Photosynthesis rate.',
    icon: 'Cloud',
    color: 'slate',
    theory: `### Limiting Factors
The rate of photosynthesis is limited by the factor that is at its least favorable level.`,
    method: `### 1. Research Question
How does CO₂ concentration limit the rate of photosynthesis at high light intensities?

### 2. Hypothesis
If the CO₂ concentration increases, then the photosynthetic rate will increase until another factor (like temperature) becomes limiting, because CO₂ is a required substrate for the Calvin cycle.

### 3. Procedure
1. Set the CO₂ concentration.
2. Measure the rate of photosynthesis while keeping light and temp constant.

### 2. Variable Manipulation
*   **Independent Variable (IV):** CO₂ concentration.
*   **Controlled Variables (CV):** Light intensity, temperature.

### 3. Reliability & Accuracy
*   Repeat 3 times and calculate mean. Exclude anomalies.

### 4. Safety Precautions
*   **CO2 Safety:** Ensure good ventilation when using CO₂ gas.

### 5. Suggested Improvements
*   Use a carbon dioxide probe for more accurate concentration measurements.`,
    independentVariables: [
      { id: 'co2', name: 'CO₂ Concentration', min: 0, max: 0.1, step: 0.01, defaultValue: 0.04, unit: '%' }
    ],
    dependentVariable: { name: 'rate', unit: 'rel. units', label: 'Photosynthetic Rate' },
    controlledVariables: ['Light Intensity', 'Temperature'],
    safetyOptions: [
      { id: 'ventilation', text: 'Ensure proper ventilation in the lab', isCorrect: true }
    ]
  },
  {
    id: 'microbial-growth',
    title: 'Microbial Growth',
    category: 'Cell Biology',
    description: 'Bacterial colony growth on agar vs time.',
    icon: 'CircleDot',
    color: 'green',
    theory: `### Bacterial Growth
Bacteria reproduce by binary fission, leading to exponential growth under ideal conditions.`,
    method: `### 1. Research Question
How does incubation temperature affect the growth rate of bacterial colonies?

### 2. Hypothesis
If the temperature increases towards the optimum, then the number of colonies will increase because bacterial enzymes catalyze metabolic reactions faster, leading to quicker binary fission.

### 3. Procedure
1. Set the incubation temperature.
2. Count the number of colonies over a 48-hour period.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Incubation temperature.
*   **Controlled Variables (CV):** Nutrient availability.

### 3. Reliability & Accuracy
*   Use multiple agar plates for each temperature.

### 4. Safety Precautions
*   **Aseptic Technique:** Use a Bunsen burner to create a sterile field.
*   **Pathogens:** Treat all bacterial cultures as potentially pathogenic.
*   **Disposal:** Autoclave all materials after use.

### 5. Suggested Improvements
*   Use a digital colony counter for more accurate and faster results.`,
    independentVariables: [
      { id: 'temp', name: 'Incubation Temp', min: 4, max: 60, step: 2, defaultValue: 37, unit: '°C' }
    ],
    dependentVariable: { name: 'colonies', unit: 'count', label: 'Number of Colonies' },
    controlledVariables: ['Nutrient Availability', 'Initial Inoculum'],
    safetyOptions: [
      { id: 'aseptic', text: 'Use aseptic techniques to prevent contamination', isCorrect: true },
      { id: 'pathogen', text: 'Handle all cultures as potentially harmful', isCorrect: true },
      { id: 'autoclave', text: 'Sterilize all equipment after the experiment', isCorrect: true }
    ]
  },
  {
    id: 'water-potential',
    title: 'Water Potential',
    category: 'Cell Biology',
    description: 'Turgor pressure and Plasmolysis in plant cells.',
    icon: 'Maximize',
    color: 'blue',
    theory: `### Water Potential
Water potential (Ψ) is a measure of the tendency of water to move from one area to another.`,
    method: `### 1. Research Question
How does the water potential of the surrounding solution affect the turgor pressure of plant cells?

### 2. Hypothesis
If the solution potential becomes more negative (hypertonic), then the turgor pressure will decrease because water leaves the cell by osmosis, causing the protoplast to shrink and pull away from the cell wall.

### 3. Procedure
1. Place plant cells in solutions of different water potentials.
2. Observe the state of the cell (Turgid, Flaccid, Plasmolyzed).

### 2. Variable Manipulation
*   **Independent Variable (IV):** Solution potential.
*   **Controlled Variables (CV):** Cell type, temperature.

### 3. Reliability & Accuracy
*   Observe at least 50 cells to calculate the percentage of plasmolysis.

### 4. Safety Precautions
*   **Glassware:** Handle microscope slides and coverslips carefully.

### 5. Suggested Improvements
*   Use an ocular micrometer to measure the change in cell volume.`,
    independentVariables: [
      { id: 'psi', name: 'Solution Potential', min: -2000, max: 0, step: 100, defaultValue: -500, unit: 'kPa' }
    ],
    dependentVariable: { name: 'turgor', unit: 'kPa', label: 'Turgor Pressure' },
    controlledVariables: ['Cell Type', 'Temperature'],
    safetyOptions: [
      { id: 'slide_glass', text: 'Handle sharp coverslips with care', isCorrect: true }
    ]
  },
  {
    id: 'biomolecule-testing',
    title: 'Biomolecule Testing',
    category: 'Biochemistry',
    description: 'Virtual Benedict’s, Biuret, and Iodine tests.',
    icon: 'TestTube',
    color: 'orange',
    theory: `### Food Tests
Specific reagents change color in the presence of certain biological molecules.`,
    method: `### 1. Research Question
Which biological molecules are present in different food samples?

### 2. Hypothesis
If a sample contains reducing sugars, then it will turn brick-red when heated with Benedict's solution because the copper(II) ions are reduced to copper(I) oxide.

### 3. Procedure
1. Select a food sample.
2. Add the reagent and observe the color change.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Sample type.
*   **Controlled Variables (CV):** Volume of reagent, heating time.

### 3. Reliability & Accuracy
*   Use a control (distilled water) for each test.

### 4. Safety Precautions
*   **Reagents:** Benedict's and Biuret reagents are irritants; wear goggles.
*   **Heat:** Use a water bath for Benedict's test; do not heat directly.

### 5. Suggested Improvements
*   Use a colorimeter to quantify the color change instead of subjective observation.`,
    independentVariables: [
      { id: 'sample', name: 'Sample Type', min: 1, max: 5, step: 1, defaultValue: 1, unit: 'ID' }
    ],
    dependentVariable: { name: 'intensity', unit: '%', label: 'Color Intensity' },
    controlledVariables: ['Volume of Reagent', 'Heating Time'],
    safetyOptions: [
      { id: 'reagent_eye', text: 'Wear goggles to protect eyes from reagents', isCorrect: true },
      { id: 'water_bath', text: 'Use a water bath for heating Benedict’s solution', isCorrect: true },
      { id: 'no_eat', text: 'Do not eat any food samples in the lab', isCorrect: true }
    ]
  },
  {
    id: 'lactose-breakdown',
    title: 'Lactose Breakdown',
    category: 'Biochemistry',
    description: 'Investigate the breakdown of lactose in milk using the enzyme lactase.',
    icon: 'Milk',
    color: 'amber',
    theory: `### Lactose & Lactase
Lactose is a disaccharide sugar found in milk. It is composed of glucose and galactose. The enzyme **Lactase** (a $\\beta$-galactosidase) catalyzes the hydrolysis of lactose into its component monosaccharides.

**The Reaction:**
$$\\text{Lactose} + H_2O \\xrightarrow{\\text{Lactase}} \\text{Glucose} + \\text{Galactose}$$

**Clinical Significance:**
Lactose intolerance occurs when the body does not produce enough lactase, leading to digestive issues when consuming dairy.

**Experimental Focus:**
*   **Temperature Effects:** Like all enzymes, lactase has an optimal temperature.
*   **Enzyme Concentration:** Increasing the amount of lactase increases the rate of glucose production until the substrate becomes limiting.
*   **Immobilized Enzymes:** In industry, lactase is often immobilized in alginate beads to produce lactose-free milk efficiently.`,
    method: `### 1. Research Question
How does enzyme concentration affect the rate of glucose production during lactose hydrolysis?

### 2. Hypothesis
If the lactase concentration increases, then the glucose concentration produced per minute will increase because there are more active sites available for lactose molecules to bind to, increasing the frequency of successful collisions.

### 3. Procedure
1. **Setup:** Adjust the **Temperature** and **Enzyme Concentration** using the sliders.
2. **Observe:** Watch the milk in the beaker. The lactase enzyme is added to the milk.
3. **Measure:** Use the **Glucose Meter** to detect the concentration of glucose produced over time.
4. **Manual Record:** 
    *   Start the **Timer** (set for 1 minute).
    *   Read the glucose concentration from the digital meter.
    *   Enter the value into the **Manual Record** field.
5. **Analysis:** Observe how temperature and enzyme concentration affect the rate of lactose hydrolysis.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Change the Temperature or Enzyme Concentration systematically.
*   **Controlled Variables (CV):** Ensure the volume of milk, pH, and initial lactose concentration are kept constant.

### 3. Reliability & Accuracy
*   **Multiple Trials:** Repeat the experiment for each condition at least **three times**.
*   **Mean Calculation:** Calculate the average glucose concentration for each trial.
*   **Anomalies:** Identify any readings that are significantly higher or lower than expected and repeat the trial.

### 4. Safety Precautions
*   **Enzymes:** Some enzymes can cause skin irritation or allergic reactions; handle with care.
*   **Glassware:** Be careful with beakers and thermometers.
*   **Hygiene:** Do not consume the milk used in the experiment as it may be contaminated.

### 5. Suggested Improvements
*   **Immobilization:** Use immobilized lactase in alginate beads to see if it improves the efficiency of the reaction compared to free enzyme.
*   **Continuous Monitoring:** Use a data logger to record glucose concentration continuously over time for a more detailed reaction curve.`,
    independentVariables: [
      { id: 'temp', name: 'Temperature', min: 0, max: 80, step: 1, defaultValue: 37, unit: '°C' },
      { id: 'enzyme', name: 'Lactase Concentration', min: 0, max: 10, step: 0.5, defaultValue: 2, unit: 'mg/ml' }
    ],
    dependentVariable: { name: 'glucose', unit: 'mmol/L', label: 'Glucose Concentration' },
    controlledVariables: ['Volume of Milk', 'Initial Lactose Concentration', 'pH'],
    safetyOptions: [
      { id: 'no_drink', text: 'Do not drink the milk used in the experiment', isCorrect: true },
      { id: 'spills', text: 'Clean up milk spills immediately to avoid slips', isCorrect: true },
      { id: 'goggles', text: 'Wear safety goggles to protect from splashes', isCorrect: true },
      { id: 'boil', text: 'Boil the milk and drink it after the experiment', isCorrect: false }
    ]
  }
];
