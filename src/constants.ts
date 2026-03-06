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

**The Reaction in this Lab:**
$$2H_2O_2 \\xrightarrow{\\text{Catalase}} 2H_2O + O_2 (\\text{bubbles})$$

**Factors Affecting Enzyme Activity:**
*   **Temperature:** Increases kinetic energy, leading to more frequent and successful collisions. However, extreme heat causes the enzyme's active site to **denature** (change shape).
*   **pH:** Each enzyme has an optimum pH. Extreme pH levels can also cause denaturation.`,
    method: `### 1. Research Question
How does changing the **pH** or **Temperature** affect the rate of catalase activity, measured by the volume of oxygen produced per minute?

### 2. Variables
*   **Independent Variable:** Temperature (°C) or pH level.
*   **Dependent Variable:** Rate of oxygen production ($\mathrm{cm^3/min}$), measured by counting bubbles or using a gas syringe.
*   **Controlled Variables:** Enzyme concentration, substrate ($H_2O_2$) concentration, volume of solution, reaction time.

### 3. Hypothesis
If the temperature increases towards the optimum (37°C), then the rate of oxygen production will increase because the kinetic energy of the molecules increases, leading to more frequent and successful collisions between the enzyme's active site and the substrate.

### 4. Materials
*   Catalase source (e.g., potato or liver extract)
*   Hydrogen peroxide ($H_2O_2$) solution
*   Water bath and thermometer
*   Buffer solutions of different pH
*   Test tubes and test tube rack
*   Gas syringe or delivery tube and beaker of water
*   Stopwatch

### 5. Procedure
1.  **Setup:** Set up the reaction vessel and delivery tube.
2.  **Preparation:** Add a fixed volume of catalase extract and buffer solution to the test tube.
3.  **Equilibration:** Place the test tube in a water bath at the desired temperature for 5 minutes.
4.  **Reaction:** Add a fixed volume of $H_2O_2$ and quickly seal the tube with a stopper connected to the gas syringe.
5.  **Measurement:** Start the timer and record the volume of oxygen produced in 1 minute.
6.  **Repeat:** Repeat the experiment for different temperatures or pH levels, ensuring at least three trials for each condition to calculate a mean.

### 6. Safety Precautions
*   **Hydrogen Peroxide:** $H_2O_2$ is corrosive and an irritant; wear safety goggles and gloves.
*   **Glassware:** Handle beakers and test tubes carefully to avoid breakage.
*   **Heat:** Use tongs or heat-resistant gloves when handling hot water baths.`,
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
$$\% \text{ Change in Mass} = \frac{\text{Final Mass} - \text{Initial Mass}}{\text{Initial Mass}} \times 100$$`,
    method: `### 1. Research Question
How does the concentration of sucrose solution affect the percentage change in mass of potato cylinders?

### 2. Variables
*   **Independent Variable:** Concentration of sucrose solution ($\mathrm{M}$ or $\mathrm{mol/dm^3}$).
*   **Dependent Variable:** Percentage change in mass of the potato cylinders ($\%$).
*   **Controlled Variables:** Initial mass and length of potato cylinders, surface area of potato, type/age of potato, temperature of the solution, volume of solution, duration of immersion.

### 3. Hypothesis
If the sucrose concentration increases, then the percentage change in mass will decrease (become more negative) because water moves out of the potato cells by osmosis from a region of higher water potential to a region of lower water potential through a partially permeable membrane.

### 4. Materials
*   Fresh potato
*   Cork borer and scalpel
*   Electronic balance (accurate to 0.01g)
*   Sucrose solutions of different concentrations (0.0M to 1.0M)
*   Beakers or boiling tubes
*   Paper towels
*   Stopwatch

### 5. Procedure
1.  **Preparation:** Use a cork borer to cut several potato cylinders. Use a scalpel to trim them to the same length (e.g., 3cm).
2.  **Initial Mass:** Blot each cylinder with a paper towel to remove excess surface water, then weigh each one and record the initial mass ($m_i$).
3.  **Immersion:** Place each cylinder into a separate beaker containing a fixed volume of a specific sucrose concentration.
4.  **Duration:** Leave the cylinders in the solution for at least 30 minutes.
5.  **Final Mass:** Remove the cylinders, blot them dry again, and record the final mass ($m_f$).
6.  **Analysis:** Calculate the percentage change in mass for each cylinder and plot a graph of concentration vs. % change.

### 6. Safety Precautions
*   **Cutting Tools:** Use a cork borer and scalpel carefully on a cutting mat; always cut away from your body.
*   **Glassware:** Handle beakers with care; clean up any spills immediately to prevent slipping.`,
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
Photosynthesis is the process by which plants synthesize glucose from $\mathrm{CO_2}$ and water using light energy. Chlorophyll in the chloroplasts absorbs light energy.

**The Equation:**
$$6\mathrm{CO_2} + 6\mathrm{H_2O} \\xrightarrow{\\text{Light}} \mathrm{C_6H_{12}O_6} + 6\mathrm{O_2}$$

**Factors Affecting Rate:**
*   **Light Intensity:** Provides energy for the light-dependent reaction.
*   **$\mathrm{CO_2}$ Concentration:** A substrate for the light-independent reaction.
*   **Temperature:** Affects the enzymes involved (e.g., Rubisco).`,
    method: `### 1. Research Question
How does light intensity affect the rate of photosynthesis in pondweed (Elodea), measured by the number of oxygen bubbles produced per minute?

### 2. Variables
*   **Independent Variable:** Light intensity (varied by changing the distance of the lamp from the plant).
*   **Dependent Variable:** Rate of photosynthesis, measured as the number of oxygen bubbles produced per minute.
*   **Controlled Variables:** Temperature of the water bath, concentration of $\mathrm{CO_2}$ (using sodium hydrogen carbonate), type and size of pondweed, wavelength of light.

### 3. Hypothesis
If the light intensity increases, then the number of oxygen bubbles produced per minute will increase because light provides the energy required for the light-dependent stage of photosynthesis, increasing the overall rate of reaction until another factor (like $\mathrm{CO_2}$ or temperature) becomes limiting.

### 4. Materials
*   Fresh pondweed (e.g., Elodea or Cabomba)
*   Beaker or water bath
*   Test tube and funnel
*   Lamp with a ruler
*   Sodium hydrogen carbonate ($\mathrm{NaHCO_3}$)
*   Stopwatch
*   Thermometer

### 5. Procedure
1.  **Setup:** Place a piece of pondweed into a test tube filled with water and $\mathrm{NaHCO_3}$. Place the test tube in a water bath to maintain a constant temperature.
2.  **Equilibration:** Place the lamp at a specific distance (e.g., 10cm) and allow the plant to adjust for 5 minutes.
3.  **Measurement:** Start the stopwatch and count the number of bubbles released from the cut stem in 1 minute.
4.  **Varying Distance:** Move the lamp to a new distance (e.g., 20cm, 30cm) and repeat the equilibration and measurement steps.
5.  **Repeat:** Conduct at least three trials for each distance to calculate a mean rate.

### 6. Safety Precautions
*   **Electrical Safety:** Keep the lamp and electrical cords away from the water to prevent electric shocks.
*   **Heat:** Be careful as the lamp can become very hot; do not touch the bulb.
*   **Glassware:** Handle beakers and test tubes carefully to avoid breakage.`,
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
    theory: `### Cellular Respiration
Cellular respiration is the chemical process that releases energy from glucose. Aerobic respiration requires oxygen and produces carbon dioxide and water as byproducts.

**The Equation:**
$$\mathrm{C_6H_{12}O_6} + 6\mathrm{O_2} \rightarrow 6\mathrm{CO_2} + 6\mathrm{H_2O} + \text{Energy (ATP)}$$

**Measuring Respiration:**
A **respirometer** is used to measure the rate of respiration by measuring the consumption of oxygen. Potassium hydroxide ($\mathrm{KOH}$) or soda lime is used to absorb the $\mathrm{CO_2}$ produced, so any change in gas volume is due solely to oxygen uptake.`,
    method: `### 1. Research Question
How does temperature affect the rate of oxygen consumption in germinating seeds?

### 2. Variables
*   **Independent Variable:** Temperature of the water bath (°C).
*   **Dependent Variable:** Rate of oxygen consumption ($\mathrm{mm^3/min}$), measured by the movement of fluid in a manometer.
*   **Controlled Variables:** Mass of germinating seeds, volume and concentration of $\mathrm{KOH}$, time interval for measurement, type of seeds.

### 3. Hypothesis
If the temperature increases, then the rate of oxygen uptake will increase because respiratory enzymes work faster at higher temperatures (due to increased kinetic energy) until they reach their optimum temperature, after which the rate will decrease due to enzyme denaturation.

### 4. Materials
*   Respirometer (two connected tubes)
*   Germinating seeds (e.g., peas or beans)
*   Glass beads (for the control tube)
*   Potassium hydroxide ($\mathrm{KOH}$) solution or pellets
*   Manometer with colored fluid
*   Water bath and thermometer
*   Stopwatch

### 5. Procedure
1.  **Setup:** Place a fixed mass of germinating seeds in one tube and an equal volume of glass beads in the control tube.
2.  **Absorbent:** Place a small amount of $\mathrm{KOH}$ in both tubes (ensuring it doesn't touch the seeds).
3.  **Equilibration:** Place both tubes in a water bath at a specific temperature and allow them to equilibrate for 10 minutes with the taps open.
4.  **Measurement:** Close the taps and record the initial position of the manometer fluid. Start the stopwatch.
5.  **Recording:** After a fixed time (e.g., 5 minutes), record the final position of the fluid.
6.  **Repeat:** Repeat for different temperatures, ensuring multiple trials for each to calculate a mean.

### 6. Safety Precautions
*   **KOH:** Potassium Hydroxide is highly corrosive; wear safety goggles and gloves at all times.
*   **Glassware:** Handle the delicate glass manometer and tubes with care.
*   **Living Organisms:** Handle the germinating seeds gently to avoid damage.`,
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
Transpiration is the process of water movement through a plant and its evaporation from aerial parts, such as leaves, stems, and flowers.

**The Transpiration Stream:**
Water is absorbed by the roots via osmosis and travels up the **xylem** vessels. This movement is driven by the **transpiration pull**, created by the evaporation of water from the spongy mesophyll cells into the air spaces within the leaf. Due to the **cohesion** of water molecules and **adhesion** to xylem walls, a continuous column of water is pulled upwards.

**Factors Affecting Rate:**
*   **Light Intensity:** Increases the rate as stomata open wider for gas exchange.
*   **Temperature:** Increases the kinetic energy of water molecules, accelerating evaporation.
*   **Wind Speed:** Removes the humid boundary layer, maintaining a steep concentration gradient.
*   **Humidity:** Decreases the rate by reducing the water potential gradient.`,
    method: `### 1. Research Question
How do varying environmental conditions (wind speed, humidity, light intensity, and temperature) influence the rate of transpiration in a leafy shoot?

### 2. Variables
*   **Independent Variable:** Environmental factor being tested (e.g., Wind Speed in $\mathrm{m/s}$).
*   **Dependent Variable:** Rate of water uptake ($\mathrm{mm/min}$), measured by the distance an air bubble moves in a capillary tube.
*   **Controlled Variables:** Leaf surface area (same shoot), total water volume, duration of measurement, type of plant.

### 3. Hypothesis
*   **Wind:** Increasing wind speed will increase the transpiration rate by removing the saturated boundary layer.
*   **Humidity:** Increasing humidity will decrease the transpiration rate by reducing the water potential gradient.
*   **Light:** Increasing light intensity will increase the rate as stomata open for photosynthesis.

### 4. Materials
*   Leafy shoot (cut underwater)
*   Potometer (capillary tube, reservoir, and scale)
*   Rubber tubing and petroleum jelly (for sealing)
*   Fan (for wind), lamp (for light intensity), clear bag (for humidity)
*   Stopwatch
*   Beaker of water

### 5. Procedure
1.  **Assembly:** Assemble the potometer underwater to prevent air bubbles from entering the xylem.
2.  **Sealing:** Use petroleum jelly to ensure all joints are airtight.
3.  **Equilibration:** Allow the plant to acclimate to the conditions for 10 minutes.
4.  **Bubble Introduction:** Introduce a single air bubble into the capillary tube using the reservoir.
5.  **Measurement:** Record the starting position of the bubble. Start the stopwatch and record the distance moved in 5 minutes.
6.  **Varying Conditions:** Change the independent variable (e.g., turn on the fan) and repeat the measurement.
7.  **Repeat:** Conduct multiple trials for each condition to ensure reliability.

### 6. Safety Precautions
*   **Glassware:** Potometers are fragile; handle with care to avoid cuts from broken glass.
*   **Water:** Wipe up any spills immediately to prevent slipping.
*   **Electricals:** Keep fans and lamps away from water sources.`,
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
    theory: `### Cell Membrane Permeability
Cell membranes are composed of a phospholipid bilayer with embedded proteins. This structure is selectively permeable, controlling the movement of substances into and out of the cell.

**Factors Affecting Permeability:**
*   **Temperature:** High temperatures increase the kinetic energy of phospholipids, making the membrane more fluid. Beyond a certain point, membrane proteins denature and the bilayer is disrupted, causing the membrane to become leaky.
*   **Solvents:** Organic solvents like ethanol can dissolve the phospholipids, destroying the membrane structure.

**Beetroot Experiment:**
Beetroot cells contain a red pigment called **betalain** stored within the large central vacuole. When the membrane permeability increases, betalain leaks out into the surrounding water, which can be measured using a colorimeter.`,
    method: `### 1. Research Question
How does temperature affect the permeability of beetroot cell membranes, measured by the absorbance of leaked betalain pigment?

### 2. Variables
*   **Independent Variable:** Temperature of the water bath (°C).
*   **Dependent Variable:** Absorbance of the solution (Arbitrary Units, $\mathrm{AU}$), measured using a colorimeter.
*   **Controlled Variables:** Size and surface area of beetroot discs, volume of distilled water, duration of immersion, wavelength of light used in the colorimeter (e.g., 525nm).

### 3. Hypothesis
If the temperature increases, then the absorbance of the solution will increase because high temperatures provide more kinetic energy to the phospholipids and eventually denature the membrane proteins, leading to a loss of membrane integrity and increased leakage of betalain pigment.

### 4. Materials
*   Fresh beetroot
*   Cork borer and scalpel
*   Water baths at different temperatures (20°C to 80°C)
*   Test tubes and test tube rack
*   Distilled water
*   Colorimeter and cuvettes
*   Stopwatch
*   Forceps

### 5. Procedure
1.  **Preparation:** Use a cork borer to cut beetroot cylinders and a scalpel to slice them into uniform discs (e.g., 2mm thick).
2.  **Washing:** Rinse the discs thoroughly in distilled water to remove any pigment released during cutting.
3.  **Immersion:** Place a fixed number of discs into test tubes containing 10ml of distilled water.
4.  **Incubation:** Place the test tubes into water baths at different temperatures for 15 minutes.
5.  **Measurement:** Remove the discs and pour the remaining liquid into a cuvette. Use a colorimeter to measure the absorbance of the solution.
6.  **Repeat:** Conduct multiple trials for each temperature to calculate a mean absorbance.

### 6. Safety Precautions
*   **Heat:** Use tongs or heat-resistant gloves when handling test tubes in hot water baths.
*   **Cutting:** Use a cutting mat and always cut away from your body when using the scalpel.
*   **Staining:** Beetroot pigment stains clothing; wear a lab coat and handle with care.`,
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
    theory: `### Mitosis and the Cell Cycle
Mitosis is the part of the cell cycle where a single cell divides into two genetically identical daughter cells. It is essential for growth, tissue repair, and asexual reproduction.

**Stages of Mitosis:**
1.  **Prophase:** Chromosomes condense and the nuclear envelope breaks down.
2.  **Metaphase:** Chromosomes line up at the cell equator.
3.  **Anaphase:** Sister chromatids are pulled to opposite poles.
4.  **Telophase:** New nuclear envelopes form around the separated chromosomes.

**Mitotic Index:**
The Mitotic Index is a measure of the proliferation rate of a tissue.
$$\text{Mitotic Index} = \frac{\text{Number of cells in mitosis}}{\text{Total number of cells}} \times 100$$`,
    method: `### 1. Research Question
How does the distance from the root tip (meristematic region) affect the mitotic index in garlic root cells?

### 2. Variables
*   **Independent Variable:** Field of view (distance from the root tip).
*   **Dependent Variable:** Mitotic Index ($\%$).
*   **Controlled Variables:** Staining technique (e.g., acetic orcein), magnification, type of plant tissue, duration of staining.

### 3. Hypothesis
If the observation is made closer to the root tip (meristematic region), then the mitotic index will be higher because this region contains the apical meristem, where cells are actively dividing to promote primary growth.

### 4. Materials
*   Garlic or onion root tips
*   Hydrochloric acid (1M)
*   Acetic orcein or Feulgen stain
*   Microscope slides and coverslips
*   Light microscope
*   Water bath (60°C)
*   Forceps and mounted needle

### 5. Procedure
1.  **Hydrolysis:** Place the root tips in 1M HCl at 60°C for 5 minutes to soften the cell walls.
2.  **Staining:** Rinse the tips and place them in acetic orcein stain for 10 minutes.
3.  **Squash:** Place a root tip on a slide, add a drop of stain, and use a mounted needle to break it up. Place a coverslip on top and press down firmly (the "squash" technique) to create a single layer of cells.
4.  **Observation:** Use a light microscope to identify cells in different stages of the cell cycle.
5.  **Counting:** Count the total number of cells and the number of cells in mitosis in several fields of view at different distances from the tip.
6.  **Calculation:** Calculate the mitotic index for each field of view.

### 6. Safety Precautions
*   **Stains:** Acetic orcein is corrosive and can stain skin/clothing; wear safety goggles, gloves, and a lab coat.
*   **Acids:** Hydrochloric acid is corrosive; handle with care.
*   **Glassware:** Handle sharp glass slides and coverslips carefully to avoid cuts.`,
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
Natural selection is the mechanism of evolution where individuals with heritable traits better suited to their environment are more likely to survive and reproduce.

**Key Principles:**
*   **Variation:** Individuals in a population show genetic variation.
*   **Selection Pressure:** Environmental factors (e.g., predation, disease) act as selection pressures.
*   **Differential Survival:** Those with advantageous traits (e.g., better camouflage) survive longer.
*   **Inheritance:** Advantageous alleles are passed on to the next generation, increasing their frequency in the population over time.

**The Peppered Moth Case:**
The peppered moth (*Biston betularia*) is a classic example of natural selection. During the Industrial Revolution, soot darkened tree trunks, giving a selective advantage to dark-colored (melanic) moths over light-colored ones.`,
    method: `### 1. Research Question
How does environmental pollution (affecting tree bark color) influence the frequency of dark-colored moths in a population over several generations?

### 2. Variables
*   **Independent Variable:** Pollution level ($\%$, affecting the darkness of the background).
*   **Dependent Variable:** Frequency of the dark (melanic) morph in the population ($\%$).
*   **Controlled Variables:** Initial population size, predation pressure (number of birds), duration of the simulation (number of generations).

### 3. Hypothesis
If the pollution level increases (darkening the tree bark), then the frequency of dark moths will increase over generations because they will be better camouflaged from avian predators, leading to higher survival and reproductive rates compared to light-colored moths.

### 4. Materials
*   Natural Selection simulation software
*   Computer or tablet
*   Data recording sheet or spreadsheet

### 5. Procedure
1.  **Baseline:** Set the pollution level to 0% (light background).
2.  **Initial Population:** Start with a mixed population of light and dark moths.
3.  **Simulation:** Run the simulation for a fixed number of generations (e.g., 10 generations).
4.  **Recording:** Record the final percentage of dark moths in the population.
5.  **Varying Pollution:** Increase the pollution level in increments (e.g., 20%, 40%, 60%, 80%, 100%) and repeat the simulation.
6.  **Repeat:** Conduct multiple runs for each pollution level to account for random variation and calculate a mean frequency.

### 6. Safety Precautions
*   **Ergonomics:** Maintain good posture and take regular breaks from the screen to avoid eye strain and repetitive strain injury.`,
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
    theory: `### Energy Flow in Ecosystems
Energy enters most ecosystems as sunlight, which is captured by producers (autotrophs) through photosynthesis. This energy is then transferred through trophic levels via feeding relationships.

**Trophic Levels:**
1.  **Producers:** Plants and algae.
2.  **Primary Consumers:** Herbivores.
3.  **Secondary Consumers:** Carnivores that eat herbivores.
4.  **Tertiary Consumers:** Top predators.

**The 10% Rule:**
On average, only about 10% of the energy available at one trophic level is transferred to the next. The remaining 90% is lost as heat during respiration, through incomplete ingestion, or as waste (egestion/excretion). This inefficiency limits the number of trophic levels in a food chain.`,
    method: `### 1. Research Question
How does the primary productivity of an ecosystem affect the total energy available to tertiary consumers?

### 2. Variables
*   **Independent Variable:** Primary production (Energy entering the ecosystem in $\mathrm{kJ}$).
*   **Dependent Variable:** Energy available at the tertiary consumer level ($\mathrm{kJ}$).
*   **Controlled Variables:** Energy transfer efficiency between trophic levels (assumed constant at 10%), number of trophic levels.

### 3. Hypothesis
If the primary production increases, then the energy available at the tertiary level will increase linearly, because although 90% of energy is lost at each transfer, the total amount of energy entering the system determines the absolute amount available at the top of the pyramid.

### 4. Materials
*   Energy Flow simulation or modeling software
*   Calculator
*   Spreadsheet for data analysis

### 5. Procedure
1.  **Input:** Set the initial primary production value (e.g., 1000 kJ).
2.  **Calculation:** Calculate the energy available at the primary consumer, secondary consumer, and tertiary consumer levels using the 10% rule.
3.  **Recording:** Record the energy value for the tertiary level.
4.  **Varying Input:** Increase the primary production in fixed increments (e.g., 2000 kJ, 3000 kJ, etc.) and repeat the calculations.
5.  **Analysis:** Plot a graph of Primary Production vs. Tertiary Level Energy.

### 6. Safety Precautions
*   **Data Accuracy:** Double-check all mathematical calculations to ensure the model accurately reflects the 10% rule.`,
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
Chromatography is a technique used to separate the components of a mixture based on their different solubilities in a mobile phase (solvent) and their different attractions to the stationary phase (paper).

**Key Concepts:**
*   **Stationary Phase:** The chromatography paper (cellulose).
*   **Mobile Phase:** The solvent (e.g., propanone or ethanol).
*   **Pigments:** Leaves contain several photosynthetic pigments:
    *   **Carotene:** Yellow-orange (most soluble, travels furthest).
    *   **Xanthophyll:** Yellow.
    *   **Chlorophyll a:** Blue-green.
    *   **Chlorophyll b:** Yellow-green (least soluble, travels least).

**The $R_f$ Value Formula:**
The Retention Factor ($R_f$) is a ratio used to identify substances.
$$R_f = \frac{\text{Distance traveled by pigment}}{\text{Distance traveled by solvent front}}$$`,
    method: `### 1. Research Question
How do the $R_f$ values of different photosynthetic pigments compare when using propanone as a solvent?

### 2. Variables
*   **Independent Variable:** Type of photosynthetic pigment (e.g., Chlorophyll a, Carotene).
*   **Dependent Variable:** $R_f$ value of each pigment.
*   **Controlled Variables:** Type of chromatography paper, type of solvent (propanone), temperature, volume of solvent.

### 3. Hypothesis
If the pigments are separated using paper chromatography, then Carotene will have the highest $R_f$ value because it is the most soluble in the propanone solvent and has the weakest affinity for the cellulose paper.

### 4. Materials
*   Fresh leaves (e.g., spinach or grass)
*   Mortar and pestle
*   Propanone (solvent)
*   Chromatography paper
*   Capillary tube or pipette
*   Glass jar with a lid
*   Pencil and ruler

### 5. Procedure
1.  **Extraction:** Crush the leaves with a small amount of propanone to extract the pigments.
2.  **Origin:** Draw a pencil line (the origin) 2cm from the bottom of the chromatography paper.
3.  **Spotting:** Use a capillary tube to apply a small, concentrated spot of pigment extract onto the center of the pencil line. Allow it to dry and repeat several times.
4.  **Development:** Place the paper into a jar containing 1cm of propanone. Ensure the solvent level is below the pigment spot.
5.  **Running:** Close the lid and allow the solvent to rise until it is near the top of the paper.
6.  **Marking:** Remove the paper and immediately mark the solvent front with a pencil.
7.  **Calculation:** Measure the distance from the origin to the solvent front and to the center of each colored spot. Calculate the $R_f$ values.

### 6. Safety Precautions
*   **Solvents:** Propanone is highly flammable; keep away from Bunsen burners and open flames.
*   **Ventilation:** Use propanone in a well-ventilated area or a fume cupboard to avoid inhaling vapors.
*   **Eye Protection:** Wear safety goggles to protect against solvent splashes.`,
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
    theory: `### Ventilation and Gas Exchange
Ventilation is the process of moving air into and out of the lungs to facilitate gas exchange. During exercise, the body's demand for oxygen increases to support aerobic respiration in the muscles.

**Key Concepts:**
*   **Breathing Rate:** The number of breaths taken per minute.
*   **Tidal Volume:** The volume of air breathed in or out during a single normal breath.
*   **Ventilation Rate:** The total volume of air moved into the lungs per minute.
    $$\text{Ventilation Rate} = \text{Breathing Rate} \times \text{Tidal Volume}$$
*   **Homeostasis:** The body adjusts ventilation to maintain stable levels of $\mathrm{O_2}$ and $\mathrm{CO_2}$ in the blood.`,
    method: `### 1. Research Question
How does exercise intensity affect the ventilation rate in humans?

### 2. Variables
*   **Independent Variable:** Exercise intensity ($\%$, varied by the speed/resistance of a treadmill or cycle ergometer).
*   **Dependent Variable:** Ventilation rate ($\mathrm{L/min}$), calculated from breathing rate and tidal volume.
*   **Controlled Variables:** Age, gender, fitness level of the subject, ambient temperature, duration of exercise before measurement.

### 3. Hypothesis
If the exercise intensity increases, then the ventilation rate will increase linearly because the muscles require more oxygen for aerobic respiration and produce more carbon dioxide, which must be removed to prevent a drop in blood pH.

### 4. Materials
*   Spirometer or peak flow meter
*   Treadmill or stationary bike
*   Stopwatch
*   Nose clip
*   Data recording software

### 5. Procedure
1.  **Resting State:** Measure the subject's breathing rate and tidal volume while at rest for 5 minutes.
2.  **Exercise:** Set the exercise intensity to a specific level (e.g., 20%).
3.  **Equilibration:** Have the subject exercise for 3 minutes to reach a steady state.
4.  **Measurement:** Use the spirometer to record the tidal volume and count the number of breaths in 1 minute.
5.  **Varying Intensity:** Increase the exercise intensity in increments (e.g., 40%, 60%, 80%) and repeat the measurements.
6.  **Recovery:** Allow the subject to rest between trials until their heart rate and breathing return to normal.

### 6. Safety Precautions
*   **Physical Overexertion:** Monitor the subject closely; stop the experiment if they feel dizzy, faint, or experience chest pain.
*   **Hygiene:** Use a clean, sterile mouthpiece for each subject to prevent the spread of infection.
*   **Medical History:** Ensure subjects do not have underlying respiratory or cardiovascular conditions (e.g., asthma).`,
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
    theory: `### Nerve Impulses and Action Potentials
Nerve impulses are electrical signals that travel along the axon of a neuron. These signals, called action potentials, are caused by the movement of ions across the cell membrane.

**Key Concepts:**
*   **Resting Potential:** The voltage across the membrane when the neuron is at rest (typically -70mV).
*   **Depolarization:** When a stimulus causes $\mathrm{Na^+}$ channels to open, $\mathrm{Na^+}$ ions rush in, making the inside of the cell more positive.
*   **Threshold Potential:** The minimum voltage (e.g., -55mV) required to trigger an action potential.
*   **All-or-Nothing Principle:** If the threshold is reached, a full action potential fires; if not, no impulse is sent. The strength of the impulse does not change with stimulus intensity.`,
    method: `### 1. Research Question
How does the strength of a stimulus affect the peak membrane potential and the firing of an action potential in a neuron?

### 2. Variables
*   **Independent Variable:** Stimulus strength ($\mathrm{mV}$).
*   **Dependent Variable:** Peak membrane potential ($\mathrm{mV}$) and whether an action potential is triggered.
*   **Controlled Variables:** Type of neuron, initial resting potential, external ion concentrations ($\mathrm{Na^+, K^+}$), temperature.

### 3. Hypothesis
If the stimulus strength is below the threshold, no action potential will fire. Once the threshold is reached, an action potential will fire at a constant peak voltage, regardless of further increases in stimulus strength, due to the all-or-nothing principle.

### 4. Materials
*   Nerve Impulse simulator or oscilloscope setup
*   Microelectrodes
*   Stimulator (voltage source)
*   Isolated neuron (e.g., giant squid axon) or digital model

### 5. Procedure
1.  **Baseline:** Record the resting membrane potential of the neuron.
2.  **Stimulation:** Apply a very low voltage stimulus (e.g., 5mV) and record the resulting change in membrane potential on the oscilloscope.
3.  **Varying Strength:** Gradually increase the stimulus voltage in small increments (e.g., 5mV steps).
4.  **Observation:** Note the exact voltage at which a rapid depolarization (action potential) occurs.
5.  **Post-Threshold:** Continue increasing the stimulus voltage beyond the threshold and record the peak potential of the resulting action potentials.

### 6. Safety Precautions
*   **Electrical Safety:** In real lab settings, ensure all electrical equipment is properly grounded and use only low-voltage stimulators to avoid damaging biological tissue or equipment.`,
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
    id: 'genetic-diagram',
    title: 'Genetic Diagram',
    subject: 'Biology',
    category: 'Genetics',
    description: 'Step-by-step monohybrid cross flow from genotypes to ratios.',
    icon: 'Dna',
    color: 'purple',
    theory: `### Genetic Diagrams
A genetic diagram is a structured way to show how alleles are passed from parents to offspring.

**The Flow:**
1.  **Parental Genotypes:** The allele combinations of the parents.
2.  **Parental Phenotypes:** The physical traits expressed by the parents.
3.  **Gametes:** The single alleles produced during meiosis.
4.  **Punnett Square:** A grid showing all possible offspring combinations.
5.  **Ratios:** The statistical probability of each genotype and phenotype.`,
    method: `### Procedure
1.  Enter the **Parental Genotypes** (e.g., Aa, aa).
2.  Observe the automatically generated **Phenotypes**.
3.  Review the **Gametes** produced by each parent.
4.  Analyze the **Punnett Square** for offspring combinations.
5.  Record the resulting **Genotypic and Phenotypic Ratios**.`,
    independentVariables: [],
    dependentVariable: { name: 'none', unit: '', label: 'Interactive Tool' },
    controlledVariables: [],
    safetyOptions: [
      { id: 'data', text: 'Ensure accurate allele entry for valid results', isCorrect: true }
    ],
    quiz: [
      {
        id: 'gd-q1',
        question: "If both parents are heterozygous (Aa), what percentage of offspring will be recessive (aa)?",
        options: ['0%', '25%', '50%', '75%'],
        correctAnswer: 1,
        explanation: 'A cross of Aa x Aa results in 25% AA, 50% Aa, and 25% aa.'
      }
    ],
    hideTimer: true
  },
  {
    id: 'pedigree-analysis',
    title: 'Pedigree Analysis',
    subject: 'Biology',
    category: 'Genetics',
    description: 'Interactive challenge to identify genotypes in a family tree.',
    icon: 'Activity',
    color: 'indigo',
    theory: `### Pedigree Charts
A pedigree is a diagram that shows the occurrence and appearance of phenotypes of a particular gene or organism and its ancestors from one generation to the next.

**Symbols:**
*   **Square:** Male
*   **Circle:** Female
*   **Filled:** Affected individual
*   **Unfilled:** Unaffected individual

**Inheritance Patterns:**
*   **Autosomal Dominant:** Appears in every generation.
*   **Autosomal Recessive:** Can skip generations.
*   **X-linked:** Shows different frequencies in males and females.`,
    method: `### Procedure
1.  Select an **Inheritance Pattern** to study.
2.  Examine the **Pedigree Chart** and the affected individuals.
3.  Use logic to deduce the **Genotypes** of the numbered individuals.
4.  Click **Identify Genotypes** to check your answers.`,
    independentVariables: [
      { id: 'pedigree_type', name: 'Inheritance Pattern', min: 0, max: 5, step: 1, defaultValue: 0, unit: '' },
      { id: 'view_mode', name: 'View Mode', min: 0, max: 1, step: 1, defaultValue: 0, unit: '' }
    ],
    dependentVariable: { name: 'none', unit: '', label: 'Interactive Tool' },
    controlledVariables: [],
    safetyOptions: [
      { id: 'logic', text: 'Use logical deduction based on inheritance rules', isCorrect: true }
    ],
    quiz: [
      {
        id: 'pa-q1',
        question: "In an Autosomal Dominant pedigree, can two unaffected parents have an affected child?",
        options: ['Yes', 'No'],
        correctAnswer: 1,
        explanation: 'No, because if the trait is dominant, at least one parent must carry and express the allele for the child to inherit it.'
      }
    ],
    hideTimer: true
  },
  {
    id: 'speciation',
    title: 'Speciation',
    subject: 'Biology',
    category: 'Ecology',
    description: 'Reproductive isolation in island populations.',
    icon: 'Globe',
    color: 'lime',
    theory: `### Speciation and Evolution
Speciation is the evolutionary process by which populations evolve to become distinct species. This often occurs when populations of the same species become reproductively isolated.

**Key Concepts:**
*   **Geographic Isolation:** Physical barriers (e.g., mountains, oceans) prevent gene flow between populations.
*   **Genetic Divergence:** Over time, isolated populations accumulate different mutations and are subject to different selection pressures.
*   **Reproductive Isolation:** Eventually, the populations become so different that they can no longer interbreed to produce fertile offspring.
*   **Adaptive Radiation:** The rapid evolution of diversely adapted species from a common ancestor (e.g., Darwin's Finches).`,
    method: `### 1. Research Question
How does the duration of geographic isolation affect the degree of genetic divergence and the likelihood of speciation between two island populations?

### 2. Variables
*   **Independent Variable:** Duration of isolation (number of generations).
*   **Dependent Variable:** Genetic divergence ($\%$) and reproductive compatibility.
*   **Controlled Variables:** Initial population size, mutation rate, selection pressure (environmental conditions), initial gene pool.

### 3. Hypothesis
If the duration of geographic isolation increases, then the genetic divergence between the two populations will increase because mutations and natural selection will act independently on each population without the homogenizing effect of gene flow.

### 4. Materials
*   Speciation simulation software
*   Computer or tablet
*   Data recording spreadsheet

### 5. Procedure
1.  **Isolation:** Set up two identical populations on separate virtual islands.
2.  **Simulation:** Run the simulation for a fixed number of generations (e.g., 100).
3.  **Measurement:** Record the percentage genetic divergence between the two populations.
4.  **Compatibility Test:** Attempt a virtual cross-breeding between individuals from both islands and record the success rate.
5.  **Varying Time:** Repeat the simulation for increasing durations (e.g., 200, 500, 1000 generations).
6.  **Repeat:** Conduct multiple runs for each duration to observe different evolutionary trajectories.

### 6. Safety Precautions
*   **Scientific Ethics:** Consider the ethical implications of studying and potentially manipulating the genetic makeup of populations in real-world conservation efforts.`,
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
    theory: `### Homeostasis and Blood Glucose Control
Homeostasis is the maintenance of a constant internal environment despite changes in external conditions. The regulation of blood glucose is a classic example of a negative feedback loop.

**Key Concepts:**
*   **Insulin:** A hormone secreted by $\beta$-cells in the pancreas when blood glucose is high. It stimulates cells to take up glucose and the liver to convert glucose to glycogen.
*   **Glucagon:** A hormone secreted by $\alpha$-cells in the pancreas when blood glucose is low. It stimulates the liver to break down glycogen into glucose.
*   **Negative Feedback:** A mechanism where a change in a variable triggers a response that counteracts the initial change.`,
    method: `### 1. Research Question
How does the intake of different amounts of glucose affect the blood glucose and insulin concentrations over a three-hour period?

### 2. Variables
*   **Independent Variable:** Amount of glucose ingested ($\mathrm{g}$).
*   **Dependent Variable:** Blood glucose concentration ($\mathrm{mmol/L}$) and blood insulin concentration ($\mathrm{mU/L}$).
*   **Controlled Variables:** Initial fasting blood glucose level, metabolic rate, physical activity level during the test, age and health status of the subject.

### 3. Hypothesis
If the amount of glucose ingested increases, then the peak blood glucose and insulin concentrations will increase because the body must secrete more insulin to facilitate the uptake of the higher glucose load and return blood sugar levels to the homeostatic set point.

### 4. Materials
*   Hormone Control simulator
*   Virtual glucose solution
*   Blood glucose and insulin monitoring tools (digital)
*   Stopwatch

### 5. Procedure
1.  **Baseline:** Record the subject's fasting blood glucose and insulin levels.
2.  **Ingestion:** Administer a specific dose of glucose (e.g., 50g).
3.  **Monitoring:** Record blood glucose and insulin levels every 15 minutes for 3 hours.
4.  **Varying Dose:** Repeat the experiment with different glucose doses (e.g., 25g, 75g, 100g).
5.  **Analysis:** Plot the results on a graph to observe the relationship between glucose intake and the hormonal response.

### 6. Safety Precautions
*   **Medical Safety:** In a real-world setting, glucose tolerance tests must be performed under medical supervision. Individuals with diabetes or other metabolic disorders should not participate without clinical approval.`,
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
    theory: `### Osmoregulation and Kidney Function
The kidneys play a crucial role in homeostasis by regulating the water potential of the blood and removing nitrogenous waste (urea).

**Key Concepts:**
*   **Nephron:** The functional unit of the kidney where filtration and reabsorption occur.
*   **ADH (Antidiuretic Hormone):** Secreted by the posterior pituitary gland when blood water potential is low. It increases the permeability of the collecting ducts to water.
*   **Negative Feedback:** If the blood is too concentrated, more ADH is released, more water is reabsorbed, and a small volume of concentrated urine is produced.`,
    method: `### 1. Research Question
How does the volume of water ingested affect the concentration of ADH in the blood and the resulting volume of urine produced?

### 2. Variables
*   **Independent Variable:** Volume of water ingested ($\mathrm{ml}$).
*   **Dependent Variable:** Blood ADH concentration and total urine volume produced over a fixed period.
*   **Controlled Variables:** Initial hydration state, salt intake, ambient temperature, physical activity level.

### 3. Hypothesis
If the volume of water ingested increases, then the blood ADH concentration will decrease because the hypothalamus detects a rise in blood water potential, leading to less water reabsorption in the kidneys and the production of a larger volume of dilute urine.

### 4. Materials
*   Kidney Function simulator
*   Virtual water supply
*   Urine collection and measurement tools
*   Hormone assay simulator (for ADH)

### 5. Procedure
1.  **Baseline:** Record the subject's initial ADH level and urine output.
2.  **Ingestion:** Have the subject ingest a specific volume of water (e.g., 250ml).
3.  **Collection:** Collect and measure all urine produced over the next 2 hours.
4.  **Measurement:** Record the average blood ADH concentration during this period.
5.  **Varying Volume:** Repeat the experiment with different water volumes (e.g., 500ml, 1000ml, 1500ml).
6.  **Analysis:** Plot the relationship between water intake, ADH levels, and urine volume.

### 6. Safety Precautions
*   **Water Intoxication:** In real experiments, avoid consuming excessive amounts of water (hyponatremia) in a short period, as this can be dangerous.`,
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
    theory: `### Limiting Factors in Photosynthesis
The rate of photosynthesis is determined by several environmental factors. According to the Law of Limiting Factors, the rate is limited by the factor that is at its least favorable level.

**Key Factors:**
*   **Light Intensity:** Provides energy for the light-dependent reactions.
*   **$\mathrm{CO_2}$ Concentration:** A substrate for the Calvin cycle (light-independent reactions).
*   **Temperature:** Affects the kinetic energy of molecules and the activity of enzymes like Rubisco.

**Graph Analysis:**
When a graph of a factor vs. rate levels off, that factor is no longer limiting the reaction; another factor has become the limiting one.`,
    method: `### 1. Research Question
How does the concentration of carbon dioxide ($\mathrm{CO_2}$) limit the rate of photosynthesis when light intensity and temperature are held constant?

### 2. Variables
*   **Independent Variable:** Concentration of $\mathrm{CO_2}$ ($\%$).
*   **Dependent Variable:** Rate of photosynthesis (measured in relative units or bubbles per minute).
*   **Controlled Variables:** Light intensity, temperature, type of plant, wavelength of light.

### 3. Hypothesis
If the $\mathrm{CO_2}$ concentration increases, then the rate of photosynthesis will increase linearly until the active sites of the enzymes involved (like Rubisco) are saturated or another factor (like light intensity) becomes limiting.

### 4. Materials
*   Photosynthesis simulator
*   Virtual $\mathrm{CO_2}$ source (e.g., $\mathrm{NaHCO_3}$ solutions)
*   Light source and water bath
*   Stopwatch

### 5. Procedure
1.  **Setup:** Set the light intensity and temperature to high, constant levels.
2.  **Baseline:** Measure the photosynthetic rate at a low $\mathrm{CO_2}$ concentration (e.g., 0.01%).
3.  **Varying substrate:** Increase the $\mathrm{CO_2}$ concentration in steps (e.g., 0.02%, 0.04%, 0.06%, 0.08%, 0.10%).
4.  **Measurement:** Record the rate of photosynthesis at each concentration.
5.  **Analysis:** Plot a graph of $\mathrm{CO_2}$ concentration vs. rate and identify the point where $\mathrm{CO_2}$ is no longer the limiting factor.

### 6. Safety Precautions
*   **Ventilation:** In a real lab, ensure proper ventilation when using $\mathrm{CO_2}$ gas or concentrated carbonate solutions.`,
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
    theory: `### Microbial Growth and Binary Fission
Bacteria reproduce asexually through a process called binary fission, where a single cell divides into two identical daughter cells. Under optimal conditions, this can lead to exponential population growth.

**Factors Affecting Growth:**
*   **Temperature:** Affects the activity of bacterial enzymes. Most human pathogens have an optimum temperature of 37°C.
*   **Nutrients:** Availability of carbon, nitrogen, and minerals in the agar medium.
*   **pH and Oxygen:** Different bacteria have specific requirements for acidity and oxygen levels.

**Growth Phases:**
1.  **Lag Phase:** Cells adjust to the environment.
2.  **Log (Exponential) Phase:** Rapid division.
3.  **Stationary Phase:** Growth rate equals death rate due to nutrient depletion.
4.  **Death Phase:** Population declines.`,
    method: `### 1. Research Question
How does the incubation temperature affect the growth rate of bacterial colonies on nutrient agar over a 48-hour period?

### 2. Variables
*   **Independent Variable:** Incubation temperature (°C).
*   **Dependent Variable:** Number of bacterial colonies counted after 48 hours.
*   **Controlled Variables:** Type of bacteria, type and volume of nutrient agar, initial number of bacteria (inoculum), humidity, duration of incubation.

### 3. Hypothesis
If the incubation temperature increases towards the optimum (37°C), then the number of colonies will increase because bacterial enzymes will function more efficiently, leading to faster metabolic processes and more rapid binary fission.

### 4. Materials
*   Agar plates (nutrient agar)
*   Bacterial culture (e.g., *E. coli* or *B. subtilis*)
*   Inoculating loops and Bunsen burner
*   Incubators set at different temperatures (4°C, 20°C, 37°C, 60°C)
*   Disinfectant and paper towels

### 5. Procedure
1.  **Aseptic Technique:** Work near a Bunsen burner to maintain a sterile field.
2.  **Inoculation:** Use a sterile loop to streak a fixed volume of bacterial culture onto several agar plates.
3.  **Incubation:** Place the plates in incubators set at different temperatures.
4.  **Observation:** After 48 hours, remove the plates and count the number of visible colonies on each.
5.  **Repeat:** Use at least three plates for each temperature to calculate a mean colony count.

### 6. Safety Precautions
*   **Aseptic Technique:** Always use a Bunsen burner to sterilize loops and prevent contamination.
*   **Pathogens:** Treat all bacterial cultures as potentially harmful; never open plates once they have been incubated.
*   **Disposal:** All contaminated materials must be autoclaved at 121°C before disposal.
*   **Personal Safety:** Wear safety goggles, gloves, and a lab coat at all times.`,
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
    theory: `### Water Potential & Plant Cells
Water potential ($\Psi$) is a measure of the tendency of water to move from one area to another due to osmosis, gravity, mechanical pressure, or matrix effects such as capillary action.

**Key Concepts:**
*   **Water Potential ($\Psi$):** Pure water has the highest potential (0 kPa). Adding solutes lowers the water potential (makes it more negative).
*   **Turgor Pressure ($P$):** The pressure exerted by the cell contents against the cell wall.
*   **Plasmolysis:** The process in which cells lose water in a hypertonic solution, causing the protoplast to shrink away from the cell wall.
*   **Incipient Plasmolysis:** The point at which the protoplast just begins to pull away from the cell wall ($\Psi_{cell} = \Psi_{solution}$).

**The Equation:**
$$\Psi = \Psi_s + \Psi_p$$
Where:
*   $\Psi_s$: Solute potential (always negative).
*   $\Psi_p$: Pressure potential (usually positive in plant cells).`,
    method: `### 1. Research Question
How does the water potential of the surrounding solution affect the turgor pressure and state of plasmolysis in plant cells?

### 2. Variables
*   **Independent Variable:** Water potential of the surrounding solution ($\mathrm{kPa}$), varied by changing the solute concentration.
*   **Dependent Variable:** Turgor pressure ($\mathrm{kPa}$) and the percentage of cells showing plasmolysis.
*   **Controlled Variables:** Type of plant tissue (e.g., red onion epidermis), temperature, duration of immersion.

### 3. Hypothesis
If the water potential of the surrounding solution becomes more negative (hypertonic), then the turgor pressure will decrease and the percentage of plasmolysis will increase, because water moves out of the cell by osmosis down a water potential gradient.

### 4. Materials
*   Plant tissue (e.g., red onion)
*   Sucrose solutions of known water potentials (0 to -2000 kPa)
*   Microscope slides and coverslips
*   Light microscope
*   Forceps and scalpel
*   Distilled water

### 5. Procedure
1.  **Preparation:** Peel a small piece of epidermis from the plant tissue.
2.  **Mounting:** Place the tissue on a microscope slide and add a few drops of the chosen sucrose solution.
3.  **Equilibration:** Leave the slide for 5-10 minutes to allow osmosis to reach equilibrium.
4.  **Observation:** Place a coverslip and observe the cells under the microscope.
5.  **Counting:** Count the total number of cells in the field of view and the number of cells showing plasmolysis.
6.  **Measurement:** Record the estimated turgor pressure based on the degree of plasmolysis observed.
7.  **Repeat:** Repeat for all solutions of different water potentials.

### 6. Safety Precautions
*   **Glassware:** Handle microscope slides and coverslips carefully to avoid cuts.
*   **Sharp Tools:** Use forceps and scalpels with care; always cut away from your body.`,
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
    description: 'Virtual Benedict’s, Biuret, Iodine, Ethanol Emulsion, and DCPIP tests.',
    icon: 'TestTube',
    color: 'orange',
    theory: `### Biomolecule Testing (Food Tests)
Biological molecules such as carbohydrates, proteins, and lipids can be identified using specific chemical reagents that undergo a color change in their presence.

**Common Tests:**
*   **Benedict's Test (Reducing Sugars):** Benedict's reagent (blue) contains copper(II) sulfate. When heated with reducing sugars (like glucose), the blue $Cu^{2+}$ ions are reduced to red $Cu^+$ ions, forming a brick-red precipitate of copper(I) oxide.
*   **Iodine Test (Starch):** Iodine solution (orange/brown) reacts with the helical structure of amylose in starch to form a dark blue-black complex.
*   **Biuret Test (Proteins):** Biuret reagent (blue) contains copper(II) sulfate and sodium hydroxide. In the presence of peptide bonds, the copper ions form a violet/purple complex.
*   **Ethanol Emulsion Test (Lipids):** Lipids are insoluble in water but soluble in ethanol. When a lipid-ethanol solution is added to water, the lipid droplets precipitate out, forming a cloudy white emulsion.
*   **DCPIP Test (Vitamin C):** DCPIP (blue) is an electron acceptor. Vitamin C (ascorbic acid) reduces DCPIP, causing it to lose its blue color and become colorless.`,
    method: `### 1. Research Question
Which biological molecules (reducing sugars, starch, proteins, lipids) are present in the given food samples?

### 2. Variables
*   **Independent Variable:** Type of food sample.
*   **Dependent Variable:** Qualitative color change or formation of an emulsion.
*   **Controlled Variables:** Volume of reagent added, temperature of the water bath (for Benedict's test), duration of heating.

### 3. Hypothesis
If a food sample contains a specific biomolecule, then the corresponding reagent will undergo a characteristic color change (e.g., Benedict's will turn brick-red if reducing sugars are present).

### 4. Materials
*   Food samples (e.g., Apple, Potato, Milk, Oil, Egg white)
*   Benedict's reagent, Iodine solution, Biuret reagent, Ethanol
*   Test tubes and test tube rack
*   Water bath (set to 80°C)
*   Pipettes and distilled water

### 5. Procedure
1.  **Preparation:** Place a small amount of each food sample into separate test tubes.
2.  **Benedict's Test:** Add 2ml of Benedict's reagent to the sample and heat in a water bath for 5 minutes. Observe the color change.
3.  **Iodine Test:** Add 2-3 drops of Iodine solution to the sample. Observe the color change.
4.  **Biuret Test:** Add 2ml of Biuret reagent to the sample. Observe the color change.
5.  **Emulsion Test:** Add 2ml of ethanol to the sample, shake, then pour the liquid into a test tube of water. Observe for a cloudy white emulsion.
6.  **DCPIP Test:** Add DCPIP solution drop by drop to the sample. Observe if the blue color disappears.
7.  **Control:** Repeat each test using distilled water to provide a negative control for comparison.

### 6. Safety Precautions
*   **Reagents:** Benedict's and Biuret reagents are irritants; wear safety goggles and gloves.
*   **Heat:** Use a water bath for heating; never heat flammable liquids (like ethanol) directly over a flame.
*   **Chemicals:** Ethanol is highly flammable; keep it away from open flames.`,
    independentVariables: [
      { id: 'sample', name: 'Sample Type', min: 1, max: 8, step: 1, defaultValue: 1, unit: 'ID' },
      { id: 'test', name: 'Test Type', min: 1, max: 5, step: 1, defaultValue: 1, unit: 'ID' }
    ],
    dependentVariable: { name: 'intensity', unit: '%', label: 'Color Intensity' },
    controlledVariables: ['Volume of Reagent', 'Heating Time'],
    safetyOptions: [
      { id: 'reagent_eye', text: 'Wear goggles to protect eyes from reagents', isCorrect: true },
      { id: 'water_bath', text: 'Use a water bath for heating Benedict’s solution', isCorrect: true },
      { id: 'no_eat', text: 'Do not eat any food samples in the lab', isCorrect: true }
    ],
    hideTimer: true
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
    hideTimer: true,
    theory: `### Acid-Base Titration
Titration is a quantitative chemical analysis technique used to determine the unknown concentration of an identified analyte.

**The Reaction:**
$$\mathrm{HCl} (aq) + \mathrm{NaOH} (aq) \rightarrow \mathrm{NaCl} (aq) + \mathrm{H}_2\mathrm{O} (l)$$

**Key Concepts:**
*   **Equivalence Point:** The point at which the amount of titrant added is just enough to completely neutralize the analyte solution.
*   **End Point:** The point at which the indicator changes color, signaling the end of the titration.
*   **Indicators:** Different indicators change color at different pH ranges.
    *   **Phenolphthalein:** Colorless (Acid) $\rightarrow$ Pink (Base).
    *   **Methyl Orange:** Red (Acid) $\rightarrow$ Orange (End Point) $\rightarrow$ Yellow (Base).
*   **Molarity Formula:** $M_1V_1 = M_2V_2$ (for 1:1 reactions).`,
    method: `### 1. Research Question
How does the volume of $\mathrm{NaOH}$ required for neutralization change when the concentration of the unknown $\mathrm{HCl}$ solution is varied?

### 2. Variables
*   **Independent Variable:** Concentration of $\mathrm{HCl}$ ($\mathrm{mol/dm^3}$).
*   **Dependent Variable:** Volume of $\mathrm{NaOH}$ required to reach the end point ($\mathrm{cm^3}$).
*   **Controlled Variables:** Volume of $\mathrm{HCl}$ used (25ml), concentration of $\mathrm{NaOH}$ (0.1M), temperature.

### 3. Hypothesis
If the concentration of $\mathrm{HCl}$ increases, then the volume of $\mathrm{NaOH}$ required to neutralize it will increase proportionally, because a higher concentration of acid contains more moles of $\mathrm{H}^+$ ions per unit volume, requiring more moles of $\mathrm{OH}^-$ ions for complete neutralization.

### 4. Materials
*   Burette (50ml) and Conical flask (250ml)
*   Volumetric pipette (25ml)
*   Indicators (Phenolphthalein or Methyl Orange)
*   Standardized $\mathrm{NaOH}$ solution (0.1M)
*   Unknown $\mathrm{HCl}$ solution

### 5. Procedure
1.  **Setup:** Fill the burette with 0.1M $\mathrm{NaOH}$ and record the initial volume.
2.  **Preparation:** Pipette exactly 25ml of unknown $\mathrm{HCl}$ into a clean conical flask.
3.  **Indicator:** Select and add 2-3 drops of your chosen indicator to the flask.
4.  **Titration:** Slowly add $\mathrm{NaOH}$ from the burette while swirling the flask.
5.  **End Point:** As the solution begins to change color momentarily, slow down to a drop-by-drop addition.
6.  **Recording:** Stop when a permanent color change persists for at least 30 seconds. Record the final volume.

### 6. Safety Precautions
*   Wear safety goggles and a lab coat to protect against corrosive acid and base splashes.
*   Handle the burette carefully to avoid breakage; fill it below eye level using a funnel.`,
    independentVariables: [
      { id: 'drop_speed', name: 'Titration Speed', min: 1, max: 20, step: 1, defaultValue: 5, unit: 'Drops/s' },
      { id: 'concentration_base', name: 'Base Concentration', min: 0.05, max: 0.5, step: 0.01, defaultValue: 0.1, unit: 'M' }
    ],
    dependentVariable: { name: 'volume_added', unit: 'ml', label: 'Volume of NaOH' },
    controlledVariables: ['Temperature', 'Indicator Type', 'Initial Volume of Acid (25ml)'],
    safetyOptions: [
      { id: 'acid_safety', text: 'Wear goggles to protect from acid/base splashes', isCorrect: true },
      { id: 'burette_fill', text: 'Fill the burette below eye level', isCorrect: true },
      { id: 'spill_kit', text: 'Have a neutralization kit ready for spills', isCorrect: true }
    ],
    quiz: [
      {
        id: 'tit-q1',
        question: "What is the role of an indicator in a titration?",
        options: ['To speed up the reaction', 'To change the pH of the solution', 'To signal the end point with a color change', 'To neutralize the acid'],
        correctAnswer: 2,
        explanation: 'Indicators are weak acids or bases that change color at a specific pH, signaling that the neutralization is complete.'
      },
      {
        id: 'tit-q2',
        question: "Which color change is observed at the end point when using Phenolphthalein?",
        options: ['Colorless to Pale Pink', 'Blue to Red', 'Yellow to Blue', 'Red to Yellow'],
        correctAnswer: 0,
        explanation: 'Phenolphthalein is colorless in acidic solutions and turns pink in basic solutions.'
      },
      {
        id: 'tit-q3',
        question: "What is the color of Methyl Orange in a basic solution?",
        options: ['Red', 'Orange', 'Yellow', 'Colorless'],
        correctAnswer: 2,
        explanation: 'Methyl Orange is red in acidic solutions and turns yellow in basic solutions.'
      }
    ]
  },
  {
    id: 'redox-reactions',
    title: 'Redox: Metal Displacement',
    subject: 'Chemistry',
    category: 'Inorganic Chemistry',
    description: 'Investigate the reactivity series of metals through displacement reactions and electron transfer.',
    icon: 'Zap',
    color: 'orange',
    theory: `### Redox Reactions
Redox (Reduction-Oxidation) reactions involve the transfer of electrons between chemical species.

**OIL RIG:**
*   **Oxidation** Is Loss of electrons.
*   **Reduction** Is Gain of electrons.

**Displacement Reaction:**
A more reactive metal will displace a less reactive metal from its salt solution.
Example: $$\mathrm{Zn} (s) + \mathrm{CuSO}_4 (aq) \rightarrow \mathrm{ZnSO}_4 (aq) + \mathrm{Cu} (s)$$

**Ionic Equation:**
$$\mathrm{Zn} (s) + \mathrm{Cu}^{2+} (aq) \rightarrow \mathrm{Zn}^{2+} (aq) + \mathrm{Cu} (s)$$
*   $\mathrm{Zn}$ is oxidized ($\mathrm{Zn} \rightarrow \mathrm{Zn}^{2+} + 2e^-$)
*   $\mathrm{Cu}^{2+}$ is reduced ($\mathrm{Cu}^{2+} + 2e^- \rightarrow \mathrm{Cu}$)`,
    method: `### 1. Research Question
Which metal among Magnesium, Zinc, and Iron is the most reactive when placed in a solution of Copper(II) Sulfate?

### 2. Variables
*   **Independent Variable:** Type of metal ($\mathrm{Mg}$, $\mathrm{Zn}$, $\mathrm{Fe}$).
*   **Dependent Variable:** Temperature change ($\Delta T$) of the solution, indicating the energy released during the displacement reaction.
*   **Controlled Variables:** Concentration of $\mathrm{CuSO}_4$ (1.0M), volume of solution (50ml), surface area of metal strips, initial temperature.

### 3. Hypothesis
Magnesium will be the most reactive, followed by Zinc and then Iron, because Magnesium is higher in the reactivity series and has a greater tendency to lose electrons to form positive ions.

### 4. Materials
*   Metal strips ($\mathrm{Mg}$, $\mathrm{Zn}$, $\mathrm{Fe}$)
*   Copper(II) Sulfate solution ($\mathrm{CuSO}_4$)
*   Insulated calorimeter or test tubes
*   Digital thermometer
*   Sandpaper (to clean metal strips)

### 5. Procedure
1.  **Preparation:** Clean the metal strips with sandpaper to remove any oxide layer.
2.  **Setup:** Measure 50ml of 1.0M $\mathrm{CuSO}_4$ solution into an insulated cup.
3.  **Initial Reading:** Record the initial temperature of the solution.
4.  **Reaction:** Add the metal strip to the solution and stir gently.
5.  **Observation:** Observe any color changes in the solution or the formation of a solid deposit on the metal.
6.  **Final Reading:** Record the maximum temperature reached during the reaction.

### 6. Safety Precautions
*   Wear goggles to protect eyes from chemical splashes.
*   Handle metal strips with care as edges may be sharp.
*   Dispose of heavy metal solutions in designated waste containers.`,
    independentVariables: [
      { id: 'metal_type', name: 'Metal Type', min: 1, max: 3, step: 1, defaultValue: 1, unit: 'Type' },
      { id: 'concentration', name: 'Solution Concentration', min: 0.1, max: 2.0, step: 0.1, defaultValue: 1.0, unit: 'M' }
    ],
    dependentVariable: { name: 'temp_change', unit: '°C', label: 'Temperature Increase' },
    controlledVariables: ['Volume of Solution', 'Surface Area of Metal', 'Initial Temperature'],
    safetyOptions: [
      { id: 'metal_edges', text: 'Handle metal strips with care (sharp edges)', isCorrect: true },
      { id: 'chemical_disposal', text: 'Dispose of heavy metal solutions in designated waste containers', isCorrect: true }
    ],
    quiz: [
      {
        id: 'red-q1',
        question: "What does 'Oxidation' mean in terms of electrons?",
        options: ['Gain of electrons', 'Loss of electrons', 'Sharing of electrons', 'No change'],
        correctAnswer: 1,
        explanation: 'Oxidation is the loss of electrons (OIL RIG).'
      },
      {
        id: 'red-q2',
        question: "If Magnesium displaces Copper from Copper Sulfate, which is more reactive?",
        options: ['Copper', 'Magnesium', 'Both are equal', 'Neither'],
        correctAnswer: 1,
        explanation: 'A more reactive metal displaces a less reactive one from its compound.'
      }
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
    theory: `### Collision Theory & Reaction Rates
For a chemical reaction to occur, reactant particles must collide with each other. However, not all collisions lead to a reaction. For a collision to be successful, particles must have:
1.  **Sufficient Energy:** At least the **Activation Energy ($E_a$)**.
2.  **Correct Orientation:** They must hit each other in the right way.

**Factors Affecting the Rate of Reaction:**
*   **Concentration:** Increasing the concentration of reactants in a solution increases the number of particles per unit volume, leading to more frequent collisions.
*   **Surface Area:** Breaking a solid reactant into smaller pieces (increasing surface area) exposes more particles to the other reactant, increasing the frequency of collisions.
*   **Temperature:** Increasing temperature gives particles more kinetic energy, so they move faster (more frequent collisions) and a higher proportion of collisions have energy $\ge E_a$.
*   **Catalysts:** Provide an alternative reaction pathway with a lower activation energy.

**The Reaction:**
$$\mathrm{CaCO}_3 (s) + 2\mathrm{HCl} (aq) \rightarrow \mathrm{CaCl}_2 (aq) + \mathrm{H}_2\mathrm{O} (l) + \mathrm{CO}_2 (g)$$`,
    method: `### 1. Research Question
How does the concentration of Hydrochloric Acid ($\mathrm{HCl}$) affect the rate of $\mathrm{CO}_2$ gas production when reacted with Calcium Carbonate ($\mathrm{CaCO}_3$)?

### 2. Variables
*   **Independent Variable:** Concentration of $\mathrm{HCl}$ ($\mathrm{mol/dm^3}$).
*   **Dependent Variable:** Volume of $\mathrm{CO}_2$ gas produced ($\mathrm{cm^3}$) over a fixed time interval.
*   **Controlled Variables:** Mass of $\mathrm{CaCO}_3$ marble chips, surface area (size) of marble chips, volume of $\mathrm{HCl}$ (50ml), temperature.

### 3. Hypothesis
If the concentration of $\mathrm{HCl}$ increases, then the rate of gas production will increase because there are more acid particles in a given volume, leading to a higher frequency of successful collisions with the marble chips.

### 4. Materials
*   Conical flask (250ml)
*   Gas syringe (100ml)
*   Stopwatch
*   Calcium Carbonate marble chips
*   Hydrochloric Acid (various concentrations: 0.5M, 1.0M, 1.5M, 2.0M)
*   Electronic balance

### 5. Procedure
1.  **Setup:** Measure 50ml of $\mathrm{HCl}$ of the chosen concentration and pour it into the conical flask.
2.  **Preparation:** Weigh 5g of marble chips.
3.  **Reaction:** Add the marble chips to the flask and immediately seal it with the stopper connected to the gas syringe.
4.  **Timing:** Start the stopwatch immediately.
5.  **Recording:** Record the volume of gas in the syringe every 10 seconds for 2 minutes.
6.  **Repeat:** Clean the flask and repeat the experiment with different concentrations of $\mathrm{HCl}$.

### 6. Safety Precautions
*   Wear safety goggles to protect eyes from acid splashes.
*   Ensure the gas syringe is secure and moves freely to prevent pressure build-up.
*   Wipe up any acid spills immediately with a damp cloth.`,
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
    id: 'flame-test',
    title: 'Flame Test',
    subject: 'Chemistry',
    category: 'Inorganic Chemistry',
    description: 'Identify metal ions based on their characteristic flame colors.',
    icon: 'Flame',
    color: 'orange',
    theory: `### Flame Tests & Atomic Emission
Flame tests are used to identify the presence of certain metal ions in a compound. When a metal salt is heated in a Bunsen burner flame, the heat energy excites the electrons in the metal ions to higher energy levels.

**How it Works:**
1.  **Excitation:** Electrons absorb heat energy and jump to higher energy "excited" states.
2.  **Relaxation:** These excited electrons are unstable and quickly fall back to their lower energy "ground" states.
3.  **Emission:** As they fall back, they release the excess energy in the form of light (photons).
4.  **Characteristic Colors:** Each element has a unique set of energy levels, so it emits light of specific wavelengths, resulting in a characteristic color.

**Common Flame Colors:**
*   **Lithium ($Li^+$):** Crimson Red
*   **Sodium ($Na^+$):** Persistent Yellow
*   **Potassium ($K^+$):** Lilac (Light Purple)
*   **Calcium ($Ca^{2+}$):** Brick Red
*   **Strontium ($Sr^{2+}$):** Crimson
*   **Barium ($Ba^{2+}$):** Apple Green
*   **Copper ($Cu^{2+}$):** Blue-Green
*   **Rubidium ($Rb^+$):** Red-Violet
*   **Cesium ($Cs^+$):** Blue-Violet`,
    method: `### 1. Research Question
How can characteristic flame colors be used to identify unknown metal ions in various salts?

### 2. Variables
*   **Independent Variable:** Type of metal salt (Lithium, Sodium, Potassium, Calcium, Strontium, Barium, Copper, Rubidium, Cesium).
*   **Dependent Variable:** Observed color of the flame.
*   **Controlled Variables:** Bunsen burner flame type (non-luminous/blue), type of wire loop (nichrome or platinum), cleaning procedure (HCl dip).

### 3. Hypothesis
Each metal ion will produce a unique and consistent flame color when heated, allowing for the identification of the metal present in an unknown sample.

### 4. Materials
*   Bunsen burner and heat-proof mat
*   Nichrome or platinum wire loop
*   Concentrated Hydrochloric Acid ($HCl$) for cleaning
*   Samples of metal salts (chlorides are preferred as they are more volatile)
*   Beakers of distilled water

### 5. Procedure
1.  **Cleaning:** Dip the wire loop into concentrated $HCl$ and then heat it in the blue Bunsen flame until it produces no color.
2.  **Sampling:** Dip the clean loop into distilled water and then into the metal salt sample so that a small amount of salt adheres to the loop.
3.  **Testing:** Place the loop in the hottest part of the non-luminous (blue) Bunsen flame.
4.  **Observation:** Record the characteristic color observed immediately.
5.  **Repeat:** Clean the loop thoroughly between each test to avoid cross-contamination.

### 6. Safety Precautions
*   **Corrosive Acid:** Concentrated $HCl$ is highly corrosive; wear safety goggles and gloves.
*   **Heat:** The wire loop and Bunsen burner become extremely hot; handle with care.
*   **Toxic Salts:** Some metal salts are toxic; do not ingest and wash hands after the lab.`,
    independentVariables: [
      { id: 'metal_type', name: 'Metal Ion', min: 0, max: 8, step: 1, defaultValue: 0, unit: 'Ion' }
    ],
    dependentVariable: { name: 'flame_color', unit: 'Color', label: 'Observed Flame Color' },
    controlledVariables: ['Flame Temperature', 'Wire Material', 'Cleaning Procedure'],
    safetyOptions: [
      { id: 'acid_safety', text: 'Wear goggles when using concentrated HCl', isCorrect: true },
      { id: 'hot_wire', text: 'Do not touch the hot wire loop', isCorrect: true },
      { id: 'wash_hands', text: 'Wash hands after handling metal salts', isCorrect: true }
    ],
    quiz: [
      {
        id: 'flame-q1',
        question: "Why do different metals produce different colors in a flame test?",
        options: ['They burn at different temperatures', 'They have different numbers of neutrons', 'They have unique electron energy levels', 'They react with oxygen differently'],
        correctAnswer: 2,
        explanation: 'Each element has unique electron energy levels. The color is determined by the specific energy difference between the excited and ground states.'
      },
      {
        id: 'flame-q2',
        question: "Which metal ion produces a characteristic lilac flame?",
        options: ['Sodium', 'Lithium', 'Potassium', 'Barium'],
        correctAnswer: 2,
        explanation: 'Potassium ions (K+) produce a distinctive lilac or light purple flame.'
      },
      {
        id: 'flame-q3',
        question: "Why is the wire loop dipped in Hydrochloric Acid before testing a sample?",
        options: ['To make the salt stick better', 'To clean off any previous contaminants', 'To lower the melting point of the metal', 'To change the color of the flame'],
        correctAnswer: 1,
        explanation: 'Cleaning with HCl ensures that any leftover ions from previous tests are removed, preventing false results.'
      }
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
    theory: `### Hooke's Law & Elasticity
When a force is applied to a spring, it changes length. If the spring returns to its original length when the force is removed, it is said to be **elastically deformed**.

**Hooke's Law:**
The extension of a spring is directly proportional to the force applied to it, provided the **limit of proportionality** is not exceeded.

**The Formula:**
$$F = k \times x$$
Where:
*   $F$: Force applied (Newtons, $N$).
*   $k$: Spring constant (Newtons per meter, $N/m$). It is a measure of the stiffness of the spring.
*   $x$: Extension (Meters, $m$). Extension = New Length - Original Length.

**Elastic Limit:**
Beyond this point, the spring will not return to its original length; it is **permanently (plastically) deformed**.`,
    method: `### 1. Research Question
How does the force applied to a spring affect its extension, and what is the spring constant ($k$)?

### 2. Variables
*   **Independent Variable:** Force applied to the spring ($N$), varied by adding different masses.
*   **Dependent Variable:** Extension of the spring ($cm$ or $m$).
*   **Controlled Variables:** The same spring, same temperature, same method of measurement.

### 3. Hypothesis
If the force applied to the spring increases, then the extension will increase linearly, because the extension is directly proportional to the force according to Hooke's Law ($F = kx$).

### 4. Materials
*   Metal spring
*   Clamp stand, boss, and clamp
*   Meter ruler
*   Weight hanger and set of 100g masses (each 100g $\approx 1N$)
*   Pointer (optional, for better accuracy)

### 5. Procedure
1.  **Setup:** Attach the spring to the clamp and hang it from the stand.
2.  **Original Length:** Measure the natural length of the spring without any weights.
3.  **Loading:** Add a 100g mass ($1N$) to the weight hanger.
4.  **Measurement:** Measure the new length of the spring and calculate the extension ($x = L_{new} - L_{original}$).
5.  **Repeat:** Continue adding 100g masses up to 500g (or until the limit of proportionality is reached), recording the extension each time.
6.  **Unloading (Optional):** Remove the weights one by one and check if the spring returns to its original length.

### 6. Safety Precautions
*   Wear safety goggles to protect eyes in case the spring snaps or a weight falls.
*   Do not stand directly under the hanging masses.
*   Ensure the clamp stand is weighted or clamped to the bench to prevent it from toppling over.`,
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
    theory: `### Ohm's Law & Electrical Resistance
Ohm's Law describes the relationship between voltage, current, and resistance in an electrical circuit.

**Ohm's Law:**
The current through a conductor between two points is directly proportional to the voltage across the two points, provided the temperature remains constant.

**The Formula:**
$$V = I \times R$$
Where:
*   $V$: Potential Difference or Voltage (Volts, $V$).
*   $I$: Current (Amperes, $A$).
*   $R$: Resistance (Ohms, $\Omega$).

**Key Concepts:**
*   **Ohmic Conductor:** A conductor that follows Ohm's Law (e.g., a fixed resistor at constant temperature). Its $V-I$ graph is a straight line through the origin.
*   **Non-Ohmic Conductor:** A conductor that does not follow Ohm's Law (e.g., a filament lamp). Its resistance changes as the current increases and it heats up.`,
    method: `### 1. Research Question
How does the current ($I$) flowing through a fixed resistor change as the potential difference ($V$) across it is varied?

### 2. Variables
*   **Independent Variable:** Potential Difference ($V$), varied using a variable power supply or rheostat.
*   **Dependent Variable:** Current ($I$), measured using an ammeter.
*   **Controlled Variables:** Resistance of the fixed resistor, temperature of the resistor, type of connecting wires.

### 3. Hypothesis
If the voltage across the resistor increases, then the current will increase proportionally, because for an Ohmic conductor, $V \propto I$ (Ohm's Law).

### 4. Materials
*   Variable DC power supply (0-12V)
*   Fixed resistor (e.g., $10\Omega$)
*   Digital Voltmeter
*   Digital Ammeter
*   Connecting wires and switch

### 5. Procedure
1.  **Setup:** Construct a series circuit containing the power supply, ammeter, fixed resistor, and switch. Connect the voltmeter in parallel across the resistor.
2.  **Initial Reading:** Set the power supply to 0V and ensure the ammeter and voltmeter read zero.
3.  **Measurement:** Close the switch and set the voltage to 2V. Record the current ($I$) and actual voltage ($V$).
4.  **Varying Voltage:** Increase the voltage in 2V steps up to 12V, recording the current and voltage at each step.
5.  **Cooling:** Open the switch between readings to prevent the resistor from heating up, which would change its resistance.
6.  **Analysis:** Plot a graph of Voltage ($V$) on the y-axis and Current ($I$) on the x-axis. The gradient of the line represents the resistance ($R$).

### 6. Safety Precautions
*   Do not touch the resistor or wires during or immediately after the experiment as they may become hot.
*   Ensure the power supply is turned off when making or changing connections.
*   Check for short circuits before turning on the power.`,
    independentVariables: [
      { id: 'voltage', name: 'Input Voltage', min: 0, max: 12, step: 0.5, defaultValue: 0, unit: 'V' }
    ],
    dependentVariable: { name: 'current', unit: 'A', label: 'Current' },
    controlledVariables: ['Temperature', 'Resistor Value', 'Wire Length'],
    safetyOptions: [
      { id: 'hot_wire', text: 'Do not touch the resistor as it may get hot', isCorrect: true },
      { id: 'short_circuit', text: 'Ensure there are no short circuits before turning on power', isCorrect: true }
    ]
  },
  {
    id: 'refraction-snells-law',
    title: "Refraction & Snell's Law",
    subject: 'Physics',
    category: 'Waves',
    description: "Investigate the refraction of light as it passes between different media and verify Snell's Law.",
    icon: 'Sun',
    color: 'amber',
    theory: `### Refraction & Snell's Law
Refraction is the change in direction of a wave passing from one medium to another caused by its change in speed. For light, this is described by **Snell's Law**.

**Snell's Law Equation:**
$$n_1 \\sin(\\theta_1) = n_2 \\sin(\\theta_2)$$

Where:
*   $n_1, n_2$: Refractive indices of the two media.
*   $\\theta_1$: Angle of incidence (measured from the normal).
*   $\\theta_2$: Angle of refraction (measured from the normal).

**Key Concepts:**
*   **Refractive Index ($n$):** A measure of how much light slows down in a medium ($n = c/v$).
*   **Total Internal Reflection (TIR):** Occurs when light travels from a denser to a less dense medium at an angle greater than the **critical angle** ($\\theta_c = \\arcsin(n_2/n_1)$).
*   **Dispersion:** The separation of white light into its component colors due to different refractive indices for different wavelengths.`,
    method: `### 1. Research Question
How does the **Angle of Incidence** ($\theta_1$) affect the **Angle of Refraction** ($\theta_2$) when light passes from air into a transparent medium?

### 2. Variables
*   **Independent Variable:** Angle of Incidence ($\theta_1$), measured from the normal.
*   **Dependent Variable:** Angle of Refraction ($\theta_2$), measured from the normal.
*   **Controlled Variables:** Wavelength of light (color), refractive index of the first medium (Air, $n_1 \approx 1.0$), temperature.

### 3. Hypothesis
If the angle of incidence increases, then the angle of refraction will also increase, but at a slower rate (since light is entering a denser medium), following the relationship $n_1 \sin(\theta_1) = n_2 \sin(\theta_2)$.

### 4. Materials
*   Ray box or laser light source
*   Transparent blocks of different materials (Glass, Perspex, Water)
*   Protractor
*   White paper and pencil

### 5. Procedure
1.  **Setup:** Place the transparent block on a sheet of white paper and trace its outline.
2.  **Normal Line:** Draw a line perpendicular to the surface of the block (the normal).
3.  **Incidence:** Shine a thin ray of light at the point where the normal meets the block at a specific angle (e.g., 10°).
4.  **Marking:** Mark the path of the incident ray and the ray emerging from the other side of the block.
5.  **Refraction:** Remove the block and draw the refracted ray inside the block by connecting the entry and exit points.
6.  **Measurement:** Use a protractor to measure the angle of refraction ($\theta_2$) between the normal and the refracted ray.
7.  **Repeat:** Repeat the process for angles of incidence from 10° to 70° in 10° increments.
8.  **Analysis:** Calculate $\sin(\theta_1)$ and $\sin(\theta_2)$ for each pair of angles and plot a graph of $\sin(\theta_1)$ vs $\sin(\theta_2)$.

### 6. Safety Precautions
*   **Laser Safety:** Never look directly into the laser beam or point it at others.
*   **Glassware:** Handle glass blocks carefully to avoid chipping or breaking.
*   **Heat:** Ray boxes can become hot; turn them off when not in use.`,
    independentVariables: [
      { id: 'angle_inc', name: 'Angle of Incidence', min: 0, max: 90, step: 1, defaultValue: 30, unit: '°' },
      { id: 'ref_index', name: 'Refractive Index (n₂)', min: 1.0, max: 2.5, step: 0.01, defaultValue: 1.5, unit: '' }
    ],
    dependentVariable: { name: 'angle_ref', unit: '°', label: 'Angle of Refraction' },
    controlledVariables: ['Wavelength of Light', 'Refractive Index of Medium 1 (Air)', 'Temperature'],
    safetyOptions: [
      { id: 'laser', text: 'Never look directly into the laser beam', isCorrect: true },
      { id: 'blocks', text: 'Handle glass blocks with care to avoid breakage', isCorrect: true },
      { id: 'dark', text: 'Work in complete darkness to see the beam better', isCorrect: false },
      { id: 'tongs', text: 'Use tongs to hold the glass block', isCorrect: false }
    ],
    quiz: [
      {
        id: 'opt-q1',
        question: "What happens to light when it enters a more optically dense medium (higher n)?",
        options: ['It speeds up and bends away from the normal', 'It slows down and bends towards the normal', 'It speeds up and bends towards the normal', 'It stays at the same speed'],
        correctAnswer: 1,
        explanation: 'Light slows down in denser media, causing it to bend towards the normal line.'
      },
      {
        id: 'opt-q2',
        question: "What is the refractive index of a vacuum (and approximately air)?",
        options: ['0', '0.5', '1.0', '1.5'],
        correctAnswer: 2,
        explanation: 'The refractive index of a vacuum is defined as exactly 1.0. Air is very close at 1.0003.'
      }
    ],
  },
  {
    id: 'newtons-second-law',
    title: "Newton's Second Law",
    subject: 'Physics',
    category: 'Mechanics',
    description: 'Investigate the relationship between force, mass, and acceleration.',
    icon: 'Move',
    color: 'indigo',
    theory: `### Newton's Second Law of Motion
Newton's Second Law describes how the velocity of an object changes when it is subjected to an external force.

**The Law:**
The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. The acceleration is in the same direction as the net force.

**The Formula:**
$$F = m \times a$$
Where:
*   $F$: Net Force (Newtons, $N$).
*   $m$: Mass (Kilograms, $kg$).
*   $a$: Acceleration (Meters per second squared, $m/s^2$).

**Key Concepts:**
*   **Inertia:** The resistance of any physical object to any change in its velocity. Mass is the quantitative measure of inertia.
*   **Resultant Force:** The single force that has the same effect as all the individual forces acting on an object combined.`,
    method: `### 1. Research Question
How does the acceleration ($a$) of a trolley change when the resultant force ($F$) acting on it is varied, while keeping the total mass ($m$) of the system constant?

### 2. Variables
*   **Independent Variable:** Resultant force ($F$), varied by moving masses from the trolley to the weight hanger.
*   **Dependent Variable:** Acceleration ($a$) of the trolley, measured using light gates or a motion sensor.
*   **Controlled Variables:** Total mass of the system (trolley + all added masses), friction of the track (compensated by tilting or using an air track), length of the string.

### 3. Hypothesis
If the resultant force acting on the trolley increases, then the acceleration will increase linearly, because acceleration is directly proportional to the net force ($a \propto F$) when mass is constant.

### 4. Materials
*   Linear motion track (or air track) and trolley
*   Weight hanger and a set of slotted masses (e.g., $10 \times 10g$)
*   String and pulley
*   Two light gates and a data logger (or a motion sensor)
*   Electronic balance

### 5. Procedure
1.  **Setup:** Set up the track and pulley. Attach the string to the trolley and pass it over the pulley to the weight hanger.
2.  **Compensation:** Tilt the track slightly so the trolley moves at a constant speed when given a small push (compensating for friction).
3.  **Total Mass:** Place all the slotted masses on the trolley. Weigh the entire system (trolley + masses + hanger) and record this as the constant total mass ($m$).
4.  **Initial Force:** Move one $10g$ mass from the trolley to the hanger. The force is now the weight of the hanger plus the $10g$ mass ($F \approx 0.2N$ if hanger is $10g$).
5.  **Measurement:** Release the trolley and record the acceleration from the data logger.
6.  **Varying Force:** Move another $10g$ mass from the trolley to the hanger (this keeps total mass constant but increases pulling force). Record the new acceleration.
7.  **Repeat:** Repeat until all slotted masses have been moved to the hanger.
8.  **Analysis:** Plot a graph of Force ($F$) on the y-axis and Acceleration ($a$) on the x-axis.

### 6. Safety Precautions
*   Ensure the trolley does not hit the light gates or fall off the end of the track (use a buffer).
*   Place a padded box under the falling weight hanger to catch it and prevent damage to the floor or toes.`,
    independentVariables: [
      { id: 'force', name: 'Applied Force', min: 0.5, max: 10, step: 0.5, defaultValue: 1, unit: 'N' },
      { id: 'mass', name: 'Total Mass', min: 0.5, max: 5, step: 0.1, defaultValue: 1, unit: 'kg' }
    ],
    dependentVariable: { name: 'acceleration', unit: 'm/s²', label: 'Acceleration' },
    controlledVariables: ['Track Friction', 'String Tension', 'Pulley Friction'],
    safetyOptions: [
      { id: 'falling_mass', text: 'Place a padded box under the falling weights', isCorrect: true },
      { id: 'trolley_stop', text: 'Use a buffer or end-stop to prevent the trolley from flying off the track', isCorrect: true }
    ],
    quiz: [
      {
        id: 'force-q1',
        question: "If the force acting on an object is doubled while its mass stays the same, what happens to its acceleration?",
        options: ['It stays the same', 'It is halved', 'It is doubled', 'It is quadrupled'],
        correctAnswer: 2,
        explanation: 'According to F=ma, acceleration is directly proportional to force when mass is constant.'
      }
    ]
  },
  {
    id: 'dc-circuits',
    title: 'DC Circuit Analysis',
    subject: 'Physics',
    category: 'Electricity',
    description: 'Build and analyze series and parallel circuits to investigate Kirchhoff\'s Laws.',
    icon: 'Zap',
    color: 'yellow',
    theory: `### DC Circuits & Kirchhoff's Laws
Direct Current (DC) circuits involve the flow of electric charge in a single direction. Analyzing these circuits requires understanding how current and voltage behave across different components.

**Kirchhoff's First Law (Current Law):**
The sum of currents entering a junction equals the sum of currents leaving it. This is a statement of the **Conservation of Charge**.
$$\sum I_{in} = \sum I_{out}$$

**Kirchhoff's Second Law (Voltage Law):**
The sum of the electromotive forces (EMF) in any closed loop is equal to the sum of the potential differences (Voltage drops). This is a statement of the **Conservation of Energy**.
$$\sum \epsilon = \sum V$$

**Resistor Combinations:**
*   **Series:** The total resistance is the sum of individual resistances. The current is the same through all components.
    $$R_{total} = R_1 + R_2 + ...$$
*   **Parallel:** The reciprocal of the total resistance is the sum of the reciprocals of individual resistances. The voltage is the same across all parallel branches.
    $$\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + ...$$`,
    method: `### 1. Research Question
How does the total resistance ($R_{total}$) and total current ($I_{total}$) of a circuit change when resistors are connected in **Series** compared to **Parallel**?

### 2. Variables
*   **Independent Variable:** Circuit configuration (Series or Parallel) and the values of individual resistors ($R_1, R_2$).
*   **Dependent Variable:** Total current ($I_{total}$) and potential difference across components ($V$).
*   **Controlled Variables:** Battery voltage ($V_{supply}$), temperature of the components, type of connecting wires.

### 3. Hypothesis
*   **Series:** Adding resistors in series will increase the total resistance ($R_{total} > R_1, R_2$), resulting in a lower total current.
*   **Parallel:** Adding resistors in parallel will decrease the total resistance ($R_{total} < R_1, R_2$), resulting in a higher total current.

### 4. Materials
*   DC Power supply or battery
*   Two or more resistors of known values (e.g., $10\Omega, 20\Omega$)
*   Digital Ammeter
*   Digital Voltmeter
*   Connecting wires and a switch

### 5. Procedure
1.  **Series Setup:** Connect the battery, ammeter, $R_1$, and $R_2$ in a single loop (series).
2.  **Series Measurement:** Close the switch. Record the total current ($I_{total}$) and the voltage across the battery ($V_{total}$), $R_1$ ($V_1$), and $R_2$ ($V_2$).
3.  **Parallel Setup:** Connect $R_1$ and $R_2$ in parallel branches, then connect this combination in series with the battery and ammeter.
4.  **Parallel Measurement:** Close the switch. Record the total current ($I_{total}$) and the voltage across the battery ($V_{total}$) and across the parallel branches.
5.  **Analysis:** Use Ohm's Law ($R = V/I$) to calculate the experimental total resistance for both configurations and compare with theoretical values.

### 6. Safety Precautions
*   **Short Circuits:** Never connect the battery terminals directly with a wire; always include a resistor in the circuit.
*   **Overheating:** Resistors can become very hot if high current flows through them for a long time. Open the switch between readings.
*   **Polarity:** Ensure the ammeter and voltmeter are connected with the correct polarity to avoid damaging the meters.`,
    independentVariables: [
      { id: 'voltage', name: 'Battery Voltage', min: 0, max: 24, step: 0.5, defaultValue: 12, unit: 'V' },
      { id: 'r1', name: 'Resistor 1', min: 1, max: 100, step: 1, defaultValue: 10, unit: 'Ω' },
      { id: 'r2', name: 'Resistor 2', min: 1, max: 100, step: 1, defaultValue: 10, unit: 'Ω' },
      { id: 'type', name: 'Circuit Type (0:Series, 1:Parallel)', min: 0, max: 1, step: 1, defaultValue: 0, unit: '' }
    ],
    dependentVariable: { name: 'current', unit: 'A', label: 'Total Current' },
    controlledVariables: ['Temperature of Wires', 'Internal Resistance of Battery', 'Accuracy of Meters'],
    safetyOptions: [
      { id: 'short', text: 'Avoid short circuits to prevent battery damage', isCorrect: true },
      { id: 'heat', text: 'Do not touch resistors that have been under high current', isCorrect: true },
      { id: 'water', text: 'Keep liquids away from electrical components', isCorrect: true },
      { id: 'fuse', text: 'Always use a fuse in high-power circuits', isCorrect: true }
    ],
    quiz: [
      {
        id: 'elec-q1',
        question: "In a series circuit, what happens to the total resistance as more resistors are added?",
        options: ['It decreases', 'It stays the same', 'It increases', 'It becomes zero'],
        correctAnswer: 2,
        explanation: 'In series, resistances add up: R_total = R1 + R2 + ...'
      },
      {
        id: 'elec-q2',
        question: "If two 10Ω resistors are connected in parallel, what is the total resistance?",
        options: ['20Ω', '10Ω', '5Ω', '2.5Ω'],
        correctAnswer: 2,
        explanation: 'For parallel: 1/R_total = 1/10 + 1/10 = 2/10. So R_total = 10/2 = 5Ω.'
      }
    ],
  }
];

