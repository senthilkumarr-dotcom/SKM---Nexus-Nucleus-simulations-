import { Lab } from './types';

export const LABS: Lab[] = [
  {
    id: 'enzyme-action',
    title: 'Enzyme Action',
    subject: 'Biology',
    category: 'Biochemistry',
    description: 'Investigate the effect of pH and temperature on catalase activity.',
    icon: 'Beaker',
    color: 'rose',
    theory: `### Enzyme Action & Catalase
Enzymes are biological catalysts that speed up chemical reactions without being consumed. They work by lowering the activation energy required for a reaction to occur.

**The Lock and Key Hypothesis:**
The substrate fits into the complementary active site of the enzyme, forming an enzyme-substrate complex.

**Curriculum-Specific Experiments:**
*   **IBMYP / IGCSE / GCSE:**
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
    ],
    quiz: [
      {
        id: 'enz-q1',
        question: 'What is the "active site" of an enzyme?',
        options: ['The part that moves the enzyme', 'The specific region where the substrate binds', 'The part that produces energy', 'The outer shell of the enzyme'],
        correctAnswer: 1,
        explanation: 'The active site is the specific region of an enzyme where a substrate binds and a chemical reaction occurs.'
      },
      {
        id: 'enz-q2',
        question: 'What happens to an enzyme when it is "denatured"?',
        options: ['It works faster', 'It changes color', 'Its active site changes shape and it can no longer bind substrate', 'It turns into a substrate'],
        correctAnswer: 2,
        explanation: 'Denaturation is the process where an enzyme loses its functional 3D shape, usually due to high temperature or extreme pH.'
      },
      {
        id: 'enz-q3',
        question: 'In this experiment, what is the substrate for the enzyme catalase?',
        options: ['Oxygen', 'Water', 'Hydrogen Peroxide', 'Potato extract'],
        correctAnswer: 2,
        explanation: 'Catalase breaks down Hydrogen Peroxide (H2O2) into water and oxygen.'
      },
      {
        id: 'enz-q4',
        question: 'Why does the rate of reaction increase as temperature increases towards the optimum?',
        options: ['The enzyme gets larger', 'Molecules have more kinetic energy and collide more frequently', 'The active site gets smaller', 'The substrate disappears'],
        correctAnswer: 1,
        explanation: 'Higher temperature increases kinetic energy, leading to more frequent and successful collisions between enzymes and substrates.'
      },
      {
        id: 'enz-q5',
        question: 'What is the independent variable when investigating the effect of pH on enzyme activity?',
        options: ['Volume of oxygen produced', 'Temperature', 'pH level', 'Enzyme concentration'],
        correctAnswer: 2,
        explanation: 'The independent variable is the factor you change, which in this case is the pH.'
      },
      {
        id: 'enz-q6',
        question: 'What is the dependent variable in this investigation?',
        options: ['pH', 'Temperature', 'Rate of oxygen production (bubbles/min)', 'Substrate concentration'],
        correctAnswer: 2,
        explanation: 'The dependent variable is what you measure, which is the rate of reaction.'
      },
      {
        id: 'enz-q7',
        question: 'Most human enzymes have an optimum temperature of approximately:',
        options: ['0°C', '20°C', '37°C', '100°C'],
        correctAnswer: 2,
        explanation: 'Human enzymes are adapted to work best at normal body temperature, which is about 37°C.'
      },
      {
        id: 'enz-q8',
        question: 'Which of the following is a controlled variable in this experiment?',
        options: ['pH', 'Temperature', 'Concentration of Hydrogen Peroxide', 'The rate of reaction'],
        correctAnswer: 2,
        explanation: 'Substrate concentration must be kept constant to ensure a fair test when investigating other factors.'
      },
      {
        id: 'enz-q9',
        question: 'If a reaction produces 30cm³ of oxygen in 2 minutes, what is the rate of reaction?',
        options: ['15 cm³/min', '30 cm³/min', '60 cm³/min', '2 cm³/min'],
        correctAnswer: 0,
        explanation: 'Rate = Volume / Time = 30 / 2 = 15 cm³/min.'
      },
      {
        id: 'enz-q10',
        question: 'Enzymes are made of which type of biological molecule?',
        options: ['Carbohydrates', 'Lipids', 'Proteins', 'Nucleic acids'],
        correctAnswer: 2,
        explanation: 'Enzymes are globular proteins.'
      }
    ]
  },
  {
    id: 'osmosis',
    title: 'Osmosis in Potatoes',
    subject: 'Biology',
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
*   **IBMYP / IGCSE:** Measuring the change in mass of potato cylinders in different sucrose concentrations.
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
    ],
    quiz: [
      {
        id: 'osm-q1',
        question: 'What is osmosis?',
        options: ['Movement of solute from high to low concentration', 'Net movement of water from high to low water potential', 'Movement of water from low to high water potential', 'Active transport of water'],
        correctAnswer: 1,
        explanation: 'Osmosis is the diffusion of water across a partially permeable membrane from a dilute to a concentrated solution.'
      },
      {
        id: 'osm-q2',
        question: 'What is a "partially permeable membrane"?',
        options: ['A membrane that lets everything through', 'A membrane that lets nothing through', 'A membrane that lets some molecules through but not others', 'A membrane that only exists in plants'],
        correctAnswer: 2,
        explanation: 'It allows small molecules like water to pass through but blocks larger solute molecules.'
      },
      {
        id: 'osm-q3',
        question: 'If a potato cylinder is placed in pure water, what will happen to its mass?',
        options: ['Decrease', 'Increase', 'Stay the same', 'Turn into sugar'],
        correctAnswer: 1,
        explanation: 'Pure water has a higher water potential than the potato cells, so water enters the cells by osmosis.'
      },
      {
        id: 'osm-q4',
        question: 'Why is the percentage change in mass calculated instead of just the change in mass?',
        options: ['To make the numbers larger', 'To allow comparison between cylinders with different starting masses', 'Because it is easier to graph', 'To hide errors'],
        correctAnswer: 1,
        explanation: 'Percentage change accounts for variations in the initial mass of the potato cylinders.'
      },
      {
        id: 'osm-q5',
        question: 'What is the "isotonic point" on a graph of sucrose concentration vs. % mass change?',
        options: ['The highest point', 'The lowest point', 'The point where the line crosses the x-axis (0% change)', 'The starting point'],
        correctAnswer: 2,
        explanation: 'At the isotonic point, the water potential of the solution equals the water potential of the potato cells.'
      },
      {
        id: 'osm-q6',
        question: 'What is the independent variable in this investigation?',
        options: ['Initial mass of potato', 'Sucrose concentration', 'Percentage change in mass', 'Temperature'],
        correctAnswer: 1,
        explanation: 'The independent variable is the factor you change, which is the molarity of the sucrose solution.'
      },
      {
        id: 'osm-q7',
        question: 'What is the dependent variable in this investigation?',
        options: ['Sucrose concentration', 'Time submerged', 'Percentage change in mass', 'Type of potato'],
        correctAnswer: 2,
        explanation: 'The dependent variable is what you measure as a result of changing the concentration.'
      },
      {
        id: 'osm-q8',
        question: 'Why is it important to blot the potato cylinders dry before weighing them?',
        options: ['To remove excess surface solution that isn\'t part of the internal mass', 'To make them easier to handle', 'To warm them up', 'To stop osmosis'],
        correctAnswer: 0,
        explanation: 'Surface liquid would add extra mass that hasn\'t actually entered the cells.'
      },
      {
        id: 'osm-q9',
        question: 'A potato cylinder has an initial mass of 2.0g and a final mass of 2.2g. What is the % change?',
        options: ['+2%', '+10%', '+20%', '-10%'],
        correctAnswer: 1,
        explanation: '% Change = ((2.2 - 2.0) / 2.0) * 100 = (0.2 / 2.0) * 100 = 10%.'
      },
      {
        id: 'osm-q10',
        question: 'What happens to a plant cell when it is placed in a very concentrated salt solution?',
        options: ['It becomes turgid', 'It bursts', 'It becomes plasmolysed (cytoplasm pulls away from cell wall)', 'It grows faster'],
        correctAnswer: 2,
        explanation: 'Water leaves the cell, causing the vacuole to shrink and the cell membrane to pull away from the wall.'
      }
    ]
  },
  {
    id: 'photosynthesis',
    title: 'Photosynthesis Rate',
    subject: 'Biology',
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
*   **IBMYP / IGCSE:** 
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
    ],
    quiz: [
      {
        id: 'photo-q1',
        question: 'What is the independent variable in an experiment investigating the effect of distance from a light source on photosynthesis?',
        options: ['Rate of bubble production', 'Light intensity (distance)', 'Temperature of the water', 'Type of pondweed used'],
        correctAnswer: 1,
        explanation: 'The independent variable is the factor you deliberately change, which in this case is the light intensity or distance.'
      },
      {
        id: 'photo-q2',
        question: 'Why is sodium hydrogen carbonate often added to the water in this experiment?',
        options: ['To provide oxygen', 'To provide carbon dioxide', 'To keep the temperature constant', 'To act as a catalyst'],
        correctAnswer: 1,
        explanation: 'Sodium hydrogen carbonate releases CO2 into the water, ensuring it is not a limiting factor.'
      },
      {
        id: 'photo-q3',
        question: 'What is the dependent variable in this investigation?',
        options: ['Light intensity', 'Temperature', 'Number of bubbles produced per minute', 'Volume of water'],
        correctAnswer: 2,
        explanation: 'The dependent variable is what you measure, which is the rate of photosynthesis (bubbles/min).'
      },
      {
        id: 'photo-q4',
        question: 'Which of the following is a controlled variable in this experiment?',
        options: ['Light intensity', 'Temperature', 'CO2 concentration', 'Both Temperature and CO2 concentration'],
        correctAnswer: 3,
        explanation: 'To ensure a fair test, all factors other than the independent variable must be kept constant.'
      },
      {
        id: 'photo-q5',
        question: 'What gas is contained in the bubbles produced by the pondweed?',
        options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'],
        correctAnswer: 2,
        explanation: 'Photosynthesis produces oxygen gas as a byproduct.'
      },
      {
        id: 'photo-q6',
        question: 'If the light intensity is increased and the rate of photosynthesis does not change, what can be concluded?',
        options: ['Light is the limiting factor', 'Light is not the limiting factor', 'The plant is dead', 'The experiment is finished'],
        correctAnswer: 1,
        explanation: 'If increasing a factor doesn\'t increase the rate, that factor is no longer limiting the reaction.'
      },
      {
        id: 'photo-q7',
        question: 'How does temperature affect the rate of photosynthesis?',
        options: ['It has no effect', 'It increases the rate indefinitely', 'It increases the rate up to an optimum, then decreases it', 'It always decreases the rate'],
        correctAnswer: 2,
        explanation: 'Photosynthesis is controlled by enzymes, which have an optimum temperature.'
      },
      {
        id: 'photo-q8',
        question: 'Why should the pondweed be allowed to equilibrate for a few minutes after changing the light distance?',
        options: ['To let the lamp cool down', 'To allow the plant to adjust its rate to the new intensity', 'To save power', 'To make the bubbles larger'],
        correctAnswer: 1,
        explanation: 'Equilibration ensures the measured rate reflects the new conditions accurately.'
      },
      {
        id: 'photo-q9',
        question: 'What is the primary pigment involved in absorbing light for photosynthesis?',
        options: ['Carotene', 'Xanthophyll', 'Chlorophyll', 'Anthocyanin'],
        correctAnswer: 2,
        explanation: 'Chlorophyll is the main pigment that captures light energy.'
      },
      {
        id: 'photo-q10',
        question: 'Which equation correctly represents photosynthesis?',
        options: ['Glucose + Oxygen -> CO2 + Water', 'CO2 + Water -> Glucose + Oxygen', 'CO2 + Oxygen -> Glucose + Water', 'Glucose + Water -> CO2 + Oxygen'],
        correctAnswer: 1,
        explanation: 'Photosynthesis uses CO2 and water to produce glucose and oxygen.'
      }
    ]
  },
  {
    id: 'respiration',
    title: 'Cellular Respiration',
    subject: 'Biology',
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
    subject: 'Biology',
    category: 'Physiology',
    description: 'Potometer measuring transpiration rate under varying conditions.',
    icon: 'Leaf',
    color: 'teal',
    theory: `### Transpiration and the Potometer
Transpiration is the process of water movement through a plant and its evaporation from aerial parts, such as leaves, stems, and flowers. It is a vital part of the water cycle and is essential for nutrient transport and cooling the plant.

#### 1. The Transpiration Stream
Water is absorbed by the roots via osmosis and travels up the **xylem** vessels. This movement is driven by the **transpiration pull**, created by the evaporation of water from the spongy mesophyll cells into the air spaces within the leaf. Due to the **cohesion** of water molecules (hydrogen bonding) and **adhesion** to xylem walls, a continuous column of water is pulled upwards.

#### 2. Factors Affecting Rate
*   **Light Intensity:** Increases the rate as stomata open wider to allow for gas exchange during photosynthesis, providing more pathways for water vapor to escape.
*   **Temperature:** Higher temperatures increase the kinetic energy of water molecules, accelerating evaporation from the mesophyll cells.
*   **Wind Speed:** Wind removes the "boundary layer" of humid air surrounding the leaf, maintaining a steep concentration gradient between the inside of the leaf and the outside air.
*   **Humidity:** High humidity decreases the rate because it reduces the concentration gradient, making it harder for water vapor to diffuse out of the stomata.

#### 3. Measuring with a Potometer
A potometer measures the **rate of water uptake**, which is a close proxy for the rate of transpiration (though a small amount of water is used for photosynthesis and turgidity).`,
    method: `### 1. Research Question
How do varying environmental conditions (wind, humidity, light, and temperature) influence the rate of transpiration in a leafy shoot?

### 2. Hypothesis
*   **Wind:** Increasing wind speed will increase the transpiration rate by removing the saturated boundary layer.
*   **Humidity:** Increasing humidity will decrease the transpiration rate by reducing the water potential gradient.
*   **Light:** Increasing light intensity will increase the rate as stomata open for photosynthesis.

### 3. Procedure
1.  **Assembly:** Ensure the potometer is assembled underwater to prevent air bubbles from entering the xylem, which would break the transpiration stream.
2.  **Seal:** Check that all joints (especially where the shoot meets the tube) are airtight using petroleum jelly if necessary.
3.  **Equilibration:** Allow the plant to acclimate to the laboratory conditions for 5-10 minutes before taking readings.
4.  **Introduction of Bubble:** Use the reservoir tap to introduce a single air bubble into the capillary tube.
5.  **Baseline:** Record the starting position of the bubble on the millimeter scale.
6.  **Variable Adjustment:** Set your independent variable (e.g., Wind Speed to 5 m/s).
7.  **Measurement:** Start the timer and record the distance moved by the bubble over a fixed period (e.g., 5 minutes).
8.  **Reset:** Open the reservoir tap to push the bubble back to the start for the next trial.

### 4. Variable Manipulation
*   **Independent Variable (IV):** Environmental factor (Wind, Humidity, Light, or Temp).
*   **Dependent Variable (DV):** Distance moved by the bubble (mm) per unit time (min).
*   **Controlled Variables (CV):** Leaf surface area (use the same shoot), total water volume, and time interval.

### 5. Reliability & Accuracy
*   **Repeatability:** Perform three trials for each condition and calculate the mean rate.
*   **Precision:** Use the digital readout to confirm the exact distance moved.
*   **Anomalies:** If a bubble stops moving, check for leaks or blockages in the xylem.

### 6. Safety Precautions
*   **Glassware:** Potometers are fragile; handle with care.
*   **Water:** Clean up spills to prevent slipping.

### 7. Suggested Improvements
*   Use a digital potometer for more precise water uptake readings.`,
    independentVariables: [
      { id: 'wind', name: 'Wind Speed', min: 0, max: 10, step: 1, defaultValue: 0, unit: 'm/s' },
      { id: 'humidity', name: 'Humidity', min: 20, max: 100, step: 5, defaultValue: 50, unit: '%' },
      { id: 'temp', name: 'Temperature', min: 10, max: 50, step: 1, defaultValue: 25, unit: '°C' },
      { id: 'light', name: 'Light Intensity', min: 0, max: 100, step: 5, defaultValue: 50, unit: '%' }
    ],
    dependentVariable: { name: 'water_uptake', unit: 'mm/min', label: 'Rate of Transpiration' },
    controlledVariables: ['Leaf Surface Area'],
    safetyOptions: [
      { id: 'glass_care', text: 'Handle the fragile glass potometer with care', isCorrect: true },
      { id: 'spill_wipe', text: 'Wipe up water spills immediately', isCorrect: true },
      { id: 'wind_eye', text: 'Avoid looking directly into the fan', isCorrect: true }
    ],
    quiz: [
      {
        id: 'trans-q1',
        question: 'What does a potometer actually measure?',
        options: ['Water loss from leaves', 'Water uptake by the shoot', 'Rate of photosynthesis', 'Stomatal density'],
        correctAnswer: 1,
        explanation: 'A potometer measures water uptake, which is almost equal to water loss (transpiration).'
      },
      {
        id: 'trans-q2',
        question: 'Why must the potometer be assembled underwater?',
        options: ['To keep the leaves wet', 'To prevent air bubbles from entering the xylem', 'To wash the plant', 'To cool the apparatus'],
        correctAnswer: 1,
        explanation: 'Air bubbles in the xylem would break the continuous column of water, stopping transpiration.'
      },
      {
        id: 'trans-q3',
        question: 'What is the independent variable when using a fan at different speeds?',
        options: ['Humidity', 'Temperature', 'Wind speed', 'Light intensity'],
        correctAnswer: 2,
        explanation: 'The factor being changed is the wind speed.'
      },
      {
        id: 'trans-q4',
        question: 'How does high humidity affect the rate of transpiration?',
        options: ['Increases it', 'Decreases it', 'Has no effect', 'Stops it completely'],
        correctAnswer: 1,
        explanation: 'High humidity reduces the concentration gradient of water vapor between the leaf and air.'
      },
      {
        id: 'trans-q5',
        question: 'What is the purpose of the reservoir in a potometer?',
        options: ['To store spare plants', 'To reset the air bubble to the start of the scale', 'To measure water pressure', 'To collect oxygen'],
        correctAnswer: 1,
        explanation: 'The reservoir allows the bubble to be pushed back so multiple readings can be taken.'
      },
      {
        id: 'trans-q6',
        question: 'Which environmental factor would increase the rate of transpiration?',
        options: ['Increased humidity', 'Decreased temperature', 'Increased light intensity', 'Decreased wind speed'],
        correctAnswer: 2,
        explanation: 'Increased light causes stomata to open, and higher temp increases evaporation.'
      },
      {
        id: 'trans-q7',
        question: 'What is the dependent variable in this experiment?',
        options: ['Wind speed', 'Distance moved by the bubble per unit time', 'Leaf surface area', 'Temperature'],
        correctAnswer: 1,
        explanation: 'The dependent variable is the rate of transpiration (distance/time).'
      },
      {
        id: 'trans-q8',
        question: 'Why is it important to dry the leaves after assembly?',
        options: ['To make them look nice', 'To prevent water on the surface from blocking stomata', 'To increase leaf mass', 'To prevent fungal growth'],
        correctAnswer: 1,
        explanation: 'Surface water blocks stomata and reduces the initial transpiration rate.'
      },
      {
        id: 'trans-q9',
        question: 'Through which structures does most water vapor leave the leaf?',
        options: ['Cuticle', 'Epidermis', 'Stomata', 'Vascular bundles'],
        correctAnswer: 2,
        explanation: 'Stomata are the primary pores for gas exchange and transpiration.'
      },
      {
        id: 'trans-q10',
        question: 'What force pulls water up the xylem during transpiration?',
        options: ['Root pressure', 'Capillary action', 'Transpiration pull (cohesion-tension)', 'Active transport'],
        correctAnswer: 2,
        explanation: 'The evaporation of water creates a tension that pulls the water column up.'
      }
    ]
  },
  {
    id: 'membrane-permeability',
    title: 'Membrane Permeability',
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
    id: 'leaf-chromatography',
    title: 'Leaf Chromatography',
    subject: 'Biology',
    category: 'Biochemistry',
    description: 'Separate and identify photosynthetic pigments using paper chromatography.',
    icon: 'Palette',
    color: 'emerald',
    theory: `### Paper Chromatography
Chromatography is a technique used to separate the components of a mixture based on their different solubilities in a solvent and their different attractions to the stationary phase (the paper).

**Key Concepts:**
*   **Stationary Phase:** The chromatography paper (cellulose).
*   **Mobile Phase:** The solvent (e.g., propanone or ethanol).
*   **Pigments:** Leaves contain several pigments:
    *   **Carotene:** Yellow-orange (travels furthest).
    *   **Xanthophyll:** Yellow.
    *   **Chlorophyll a:** Blue-green.
    *   **Chlorophyll b:** Yellow-green (travels least).

**The $R_f$ Value Formula:**
The Retention Factor ($R_f$) is a ratio used to identify substances.
$$R_f = \frac{\text{Distance traveled by pigment}}{\text{Distance traveled by solvent front}}$$

**Curriculum-Specific Experiments:**
*   **IBMYP / IGCSE:** Separating pigments from spinach or grass to see different colors.
*   **IBDP / A-Level:** Calculating $R_f$ values and identifying pigments by comparing to standard values.`,
    method: `### 1. Research Question
How do the $R_f$ values of different photosynthetic pigments compare when using propanone as a solvent?

### 2. Hypothesis
If the pigments are separated, then Carotene will have the highest $R_f$ value because it is the most soluble in the solvent and has the least affinity for the paper.

### 3. Procedure
1.  **Extraction:** Select a leaf type (e.g., Spinach).
2.  **Preparation:** Click **'Crush Leaf'** to extract the concentrated pigment.
3.  **Spotting:** Click **'Apply Spot'** to place a small, concentrated drop of pigment on the pencil line of the chromatography paper. Repeat to ensure the spot is dark.
4.  **Development:** Click **'Place in Solvent'**. Ensure the solvent level is *below* the pigment spot.
5.  **Observation:** Watch as the solvent front rises, carrying the pigments at different speeds.
6.  **Measurement:** Click **'Mark Solvent Front'** once it near the top.
7.  **Calculation:** Measure the distance from the origin to the solvent front and to the center of each pigment spot. Calculate $R_f$ values.

### 4. Variable Manipulation
*   **Independent Variable (IV):** Leaf type or Solvent type.
*   **Dependent Variable (DV):** $R_f$ values of pigments.

### 5. Safety Precautions
*   **Solvents:** Propanone and ethanol are highly flammable; keep away from open flames.
*   **Ventilation:** Use solvents in a well-ventilated area or fume cupboard.`,
    independentVariables: [
      { id: 'leafType', name: 'Leaf Type', min: 1, max: 3, step: 1, defaultValue: 1, unit: '' },
      { id: 'solvent', name: 'Solvent', min: 1, max: 2, step: 1, defaultValue: 1, unit: '' }
    ],
    dependentVariable: { name: 'rf_value', unit: '', label: 'Rf Value' },
    controlledVariables: ['Paper Type', 'Temperature', 'Solvent Volume'],
    safetyOptions: [
      { id: 'flame', text: 'Keep flammable solvents away from Bunsen burners', isCorrect: true },
      { id: 'fume', text: 'Use propanone in a well-ventilated area', isCorrect: true },
      { id: 'goggles_chrom', text: 'Wear safety goggles to protect eyes from solvent splashes', isCorrect: true }
    ],
    quiz: [
      {
        id: 'chrom-q1',
        question: 'Why must the solvent level be below the pigment spot?',
        options: ['To stop the paper getting too wet', 'To prevent the pigment from dissolving into the bulk solvent', 'To make the pigments travel faster', 'To keep the paper straight'],
        correctAnswer: 1,
        explanation: 'If the spot is submerged, the pigment will simply dissolve into the beaker of solvent instead of traveling up the paper.'
      },
      {
        id: 'chrom-q2',
        question: 'Which pigment typically travels the furthest in a propanone solvent?',
        options: ['Chlorophyll a', 'Chlorophyll b', 'Xanthophyll', 'Carotene'],
        correctAnswer: 3,
        explanation: 'Carotene is the most soluble and has the least attraction to the paper, so it travels the furthest.'
      },
      {
        id: 'chrom-q3',
        question: 'What does a high Rf value indicate?',
        options: ['The substance is very heavy', 'The substance is highly soluble in the mobile phase', 'The substance is strongly attracted to the paper', 'The substance is not a pigment'],
        correctAnswer: 1,
        explanation: 'A high Rf value means the substance traveled nearly as far as the solvent, indicating high solubility in that solvent.'
      }
    ]
  },
  {
    id: 'ventilation',
    title: 'Ventilation & Exercise',
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
    id: 'speciation',
    title: 'Speciation',
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
    subject: 'Biology',
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
  },
  {
    id: 'food-calorimetry',
    title: 'Food Calorimetry',
    subject: 'Biology',
    category: 'Biochemistry',
    description: 'Measuring the energy content of different food samples (Carbs, Lipids, Proteins).',
    icon: 'Flame',
    color: 'orange',
    theory: `### Measuring Food Energy
Food contains chemical energy stored in the bonds of its molecules (carbohydrates, fats, proteins). We can measure this energy by burning a food sample and using the heat released to warm a known volume of water.

**Energy Content by Molecule Type:**
*   **Lipids (Fats):** ~37 kJ/g (Highest energy density)
*   **Carbohydrates:** ~17 kJ/g
*   **Proteins:** ~17 kJ/g

**The Equation:**
The energy captured by the water ($Q$) is calculated using:
$$Q = m \times c \times \Delta T$$
*   $Q$: Energy captured (Joules)
*   $m$: Mass of water (grams, where $1\text{ml} = 1\text{g}$)
*   $c$: Specific heat capacity of water ($4.18 \text{ J/g°C}$)
*   $\Delta T$: Temperature change ($T_{\text{final}} - T_{\text{initial}}$)

**Energy Content per Gram:**
To compare different foods, we calculate the energy per gram:
$$\text{Energy per gram (J/g)} = \frac{Q}{\text{Mass of food burnt (g)}}$$`,
    method: `### 1. Research Question
Which food sample (Peanut, Chip, Jerky, Biscuit, Crouton, Popcorn) contains the most energy per gram?

### 2. Hypothesis
If a food sample has a higher lipid (fat) content (like a peanut or potato chip), then it will release significantly more energy when burnt because fats contain more than double the energy per gram compared to carbohydrates or proteins.

### 3. Procedure
1. **Measure Water:** Pour exactly 20ml of water into the test tube.
2. **Initial Temp:** Record the starting temperature ($T_1$) of the water.
3. **Weigh Food:** Select a food sample and record its initial mass.
4. **Burn:** Light the food sample and hold it directly under the test tube.
5. **Final Temp:** Once the food has finished burning, record the highest temperature reached ($T_2$).
6. **Calculate:** Use the formula to find the energy content.

### 2. Variable Manipulation
*   **Independent Variable (IV):** Type of food sample (6 different sources).
*   **Controlled Variables (CV):** Volume of water (20ml), distance of flame from tube, same type of calorimeter setup.

### 3. Reliability & Accuracy
*   **Heat Loss:** A significant amount of heat is lost to the surroundings. Using a draft shield can improve accuracy.
*   **Complete Combustion:** Ensure the food is completely burnt to ash.

### 4. Safety Precautions
*   **Goggles:** Mandatory to protect from "spitting" hot oil.
*   **Allergies:** Be aware of nut allergies in the lab.
*   **Fire:** Keep the setup on a heat-resistant mat.

### 5. Suggested Improvements
*   Use a **Bomb Calorimeter** for much more accurate results as it minimizes heat loss and ensures complete combustion.`,
    independentVariables: [
      { id: 'foodType', name: 'Food Sample', min: 1, max: 6, step: 1, defaultValue: 1, unit: '' },
      { id: 'waterVolume', name: 'Water Volume', min: 10, max: 50, step: 5, defaultValue: 20, unit: 'ml' }
    ],
    dependentVariable: { name: 'tempRise', unit: '°C', label: 'Temperature Rise' },
    controlledVariables: ['Distance from Flame', 'Initial Temperature', 'Draft Conditions'],
    safetyOptions: [
      { id: 'goggles', text: 'Wear safety goggles at all times', isCorrect: true },
      { id: 'mat', text: 'Place the apparatus on a heat-resistant mat', isCorrect: true },
      { id: 'hair', text: 'Tie back long hair near the flame', isCorrect: true },
      { id: 'touch_flame', text: 'Touch the burning food to see if it is hot', isCorrect: false }
    ],
    quiz: [
      {
        id: 'cal-q1',
        question: 'What is the primary energy transformation occurring in this experiment?',
        options: ['Kinetic to Potential', 'Chemical to Thermal', 'Thermal to Chemical', 'Light to Chemical'],
        correctAnswer: 1,
        explanation: 'Chemical energy stored in the food is converted into thermal (heat) energy during combustion.'
      },
      {
        id: 'cal-q2',
        question: 'What does "c" represent in the formula Q = mcΔT?',
        options: ['Speed of light', 'Caloric value', 'Specific heat capacity', 'Concentration'],
        correctAnswer: 2,
        explanation: 'c is the specific heat capacity, which for water is 4.18 J/g°C.'
      },
      {
        id: 'cal-q3',
        question: 'Why is the calculated energy value usually much lower than the actual value on the food packaging?',
        options: ['The food is old', 'Heat is lost to the surroundings', 'The thermometer is broken', 'Water has no energy'],
        correctAnswer: 1,
        explanation: 'A lot of heat energy escapes into the air or is absorbed by the glass tube rather than the water.'
      },
      {
        id: 'cal-q4',
        question: 'Which food group generally contains the most energy per gram?',
        options: ['Carbohydrates', 'Proteins', 'Fats (Lipids)', 'Vitamins'],
        correctAnswer: 2,
        explanation: 'Fats contain more than double the energy per gram compared to carbohydrates or proteins.'
      },
      {
        id: 'cal-q5',
        question: 'What is the independent variable in this investigation?',
        options: ['Temperature rise', 'Volume of water', 'Type of food sample', 'Mass of water'],
        correctAnswer: 2,
        explanation: 'The independent variable is the factor you are testing, which is the type of food.'
      },
      {
        id: 'cal-q6',
        question: 'What is the dependent variable in this investigation?',
        options: ['Type of food', 'Temperature rise of the water', 'Volume of water', 'Specific heat capacity'],
        correctAnswer: 1,
        explanation: 'The dependent variable is what you measure (the temperature change) as a result of burning the food.'
      },
      {
        id: 'cal-q7',
        question: 'If 20g of water rises by 10°C, how much energy was captured? (c = 4.18)',
        options: ['83.6 J', '836 J', '200 J', '41.8 J'],
        correctAnswer: 1,
        explanation: 'Q = m * c * ΔT = 20 * 4.18 * 10 = 836 Joules.'
      },
      {
        id: 'cal-q8',
        question: 'How can the accuracy of this experiment be improved?',
        options: ['Using more water', 'Using a draft shield', 'Burning the food faster', 'Using a smaller test tube'],
        correctAnswer: 1,
        explanation: 'A draft shield reduces heat loss to the surroundings, making the measurement more accurate.'
      },
      {
        id: 'cal-q9',
        question: 'Why is it important to stir the water before taking the final temperature reading?',
        options: ['To cool it down', 'To ensure the heat is distributed evenly', 'To make it evaporate', 'To speed up the reaction'],
        correctAnswer: 1,
        explanation: 'Stirring ensures that the thermometer measures the average temperature of all the water.'
      },
      {
        id: 'cal-q10',
        question: 'What is a "Bomb Calorimeter"?',
        options: ['An explosive device', 'A highly accurate device for measuring energy content', 'A type of thermometer', 'A food sample'],
        correctAnswer: 1,
        explanation: 'A bomb calorimeter is a specialized piece of equipment that ensures complete combustion and minimal heat loss.'
      }
    ]
  },
  {
    id: 'acid-base-titration',
    title: 'Acid-Base Titration',
    subject: 'Chemistry',
    category: 'Physical Chemistry',
    description: 'Determine the concentration of an unknown acid using a standard base and indicator.',
    icon: 'FlaskConical',
    color: 'blue',
    theory: `### Acid-Base Titration
Titration is a quantitative chemical analysis technique used to determine the unknown concentration of an identified analyte.

**The Reaction:**
$$HCl (aq) + NaOH (aq) \\rightarrow NaCl (aq) + H_2O (l)$$

**Key Concepts:**
*   **Equivalence Point:** The point at which the amount of titrant added is just enough to completely neutralize the analyte solution.
*   **End Point:** The point at which the indicator changes color, signaling the end of the titration.
*   **Molarity Formula:** $M_1V_1 = M_2V_2$ (for 1:1 reactions).`,
    method: `### 1. Research Question
What is the exact molarity of the unknown Hydrochloric Acid (HCl) solution?

### 2. Procedure
1. Fill the burette with 0.1M Sodium Hydroxide (NaOH).
2. Pipette 25ml of unknown HCl into a conical flask.
3. Add 2-3 drops of Phenolphthalein indicator.
4. Slowly add NaOH from the burette while swirling until a permanent pale pink color appears.
5. Record the final volume and calculate the titre.`,
    independentVariables: [
      { id: 'drop_size', name: 'Drop Size', min: 0.01, max: 0.1, step: 0.01, defaultValue: 0.05, unit: 'ml' }
    ],
    dependentVariable: { name: 'volume', unit: 'ml', label: 'Volume of NaOH added' },
    controlledVariables: ['Temperature', 'Indicator Type', 'Initial Volume of Acid'],
    safetyOptions: [
      { id: 'acid_safety', text: 'Wear goggles to protect from acid/base splashes', isCorrect: true },
      { id: 'burette_fill', text: 'Fill the burette below eye level', isCorrect: true }
    ]
  },
  {
    id: 'reaction-rates-gas',
    title: 'Rates of Reaction (Gas Syringe)',
    subject: 'Chemistry',
    category: 'Physical Chemistry',
    description: 'Investigate how surface area and concentration affect the rate of gas production.',
    icon: 'Timer',
    color: 'emerald',
    theory: `### Collision Theory
For a reaction to occur, particles must collide with sufficient energy (Activation Energy) and correct orientation.

**Factors Affecting Rate:**
*   **Concentration:** More particles in the same volume leads to more frequent collisions.
*   **Surface Area:** More exposed particles in solids leads to more frequent collisions.
*   **Temperature:** Particles have more kinetic energy and move faster.`,
    method: `### 1. Research Question
How does the concentration of HCl affect the rate of reaction with Calcium Carbonate?

### 2. Procedure
1. Place marble chips in a conical flask.
2. Add HCl of a specific concentration.
3. Immediately connect the gas syringe and start the timer.
4. Record the volume of $CO_2$ produced every 10 seconds.`,
    independentVariables: [
      { id: 'concentration', name: 'Acid Concentration', min: 0.1, max: 2.0, step: 0.1, defaultValue: 1.0, unit: 'M' },
      { id: 'surface_area', name: 'Surface Area', min: 1, max: 3, step: 1, defaultValue: 2, unit: 'Scale' }
    ],
    dependentVariable: { name: 'gas_volume', unit: 'cm³', label: 'Volume of CO₂' },
    controlledVariables: ['Mass of Marble Chips', 'Temperature', 'Volume of Acid'],
    safetyOptions: [
      { id: 'gas_pressure', text: 'Ensure the gas syringe moves freely to avoid pressure build-up', isCorrect: true },
      { id: 'acid_spill', text: 'Wipe up any acid spills immediately', isCorrect: true }
    ]
  },
  {
    id: 'hookes-law',
    title: "Hooke's Law",
    subject: 'Physics',
    category: 'Mechanics',
    description: 'Investigate the relationship between force and extension for a spring.',
    icon: 'Scale',
    color: 'orange',
    theory: `### Hooke's Law
The extension of a spring is directly proportional to the force applied to it, provided the limit of proportionality is not exceeded.

**The Formula:**
$$F = k \times x$$
*   $F$: Force (Newtons, $N$)
*   $k$: Spring constant ($N/m$)
*   $x$: Extension (Meters, $m$)`,
    method: `### 1. Research Question
What is the spring constant ($k$) of the given metal spring?

### 2. Procedure
1. Measure the natural length of the spring.
2. Add a 100g mass ($1N$ force) to the spring.
3. Measure the new length and calculate the extension.
4. Repeat for masses up to 500g.
5. Plot a graph of Force vs. Extension.`,
    independentVariables: [
      { id: 'mass', name: 'Added Mass', min: 0, max: 1000, step: 50, defaultValue: 0, unit: 'g' }
    ],
    dependentVariable: { name: 'extension', unit: 'cm', label: 'Extension' },
    controlledVariables: ['Spring Material', 'Temperature', 'Initial Length'],
    safetyOptions: [
      { id: 'eye_spring', text: 'Wear goggles in case the spring snaps', isCorrect: true },
      { id: 'feet_safety', text: 'Keep feet away from the area below the hanging masses', isCorrect: true }
    ]
  },
  {
    id: 'ohms-law',
    title: "Ohm's Law",
    subject: 'Physics',
    category: 'Electricity',
    description: 'Investigate the relationship between voltage, current, and resistance.',
    icon: 'Zap',
    color: 'yellow',
    theory: `### Ohm's Law
The current through a conductor between two points is directly proportional to the voltage across the two points.

**The Formula:**
$$V = I \times R$$
*   $V$: Voltage (Volts, $V$)
*   $I$: Current (Amperes, $A$)
*   $R$: Resistance (Ohms, $\Omega$)`,
    method: `### 1. Research Question
How does the current change as the voltage across a fixed resistor is increased?

### 2. Procedure
1. Set up a circuit with a power supply, ammeter, voltmeter, and a fixed resistor.
2. Adjust the power supply to $2V$.
3. Record the current from the ammeter and voltage from the voltmeter.
4. Increase the voltage in $2V$ steps up to $12V$.
5. Calculate the resistance for each reading.`,
    independentVariables: [
      { id: 'voltage', name: 'Input Voltage', min: 0, max: 12, step: 0.5, defaultValue: 0, unit: 'V' }
    ],
    dependentVariable: { name: 'current', unit: 'A', label: 'Current' },
    controlledVariables: ['Temperature', 'Resistor Value', 'Wire Length'],
    safetyOptions: [
      { id: 'hot_wire', text: 'Do not touch the resistor as it may get hot', isCorrect: true },
      { id: 'short_circuit', text: 'Ensure there are no short circuits before turning on power', isCorrect: true }
    ]
  }
];

