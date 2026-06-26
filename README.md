# Tribology Expert Advisor (TEA)

<div align="center">

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-GitHub_Pages-brightgreen)](https://stvflwers-alt.github.io/tribology/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**An Interactive Decision-Support System for Tribological Design, Failure Analysis, and Lubrication Management**

*Based on Stachowiak & Batchelor's "Engineering Tribology"*

</div>

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Built With](#built-with)
- [Live Demo](#live-demo)
- [Quick Start](#quick-start)
- [Internationalization](#internationalization)
- [Project Status](#project-status)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## About The Project

Industrial tribology failures cost billions annually. Yet diagnosing wear mechanisms and selecting proper lubrication requires deep expertise spanning mechanical engineering, material science, and fluid dynamics.

**Tribology Expert Advisor (TEA)** transforms the reference textbook "Engineering Tribology" by Stachowiak & Batchelor into an interactive decision-support system. Instead of manually looking up formulas and decision trees, engineers can follow a guided 4-step process that mirrors the diagnostic workflow of a senior tribologist.

The system is built as a single-page application using vanilla JavaScript, HTML, and CSS — no frameworks, no backend, no dependencies. It runs entirely in the browser and performs all calculations client-side.

---

## How It Works

The system guides users through 4 sequential steps. At each step, the questions adapt dynamically based on previous answers — exactly like a real engineering consultation.

### Step 1: Determine Route, Urgency & Context

The first step identifies what kind of problem you're solving and how urgent it is.

**Three main paths are available:**

- **Path 1 (Design):** Designing or modifying a component or prototype
- **Path 2 (Troubleshooting):** Diagnosing a machine that has failed in production
- **Path 3 (Monitoring):** Condition monitoring of a healthy machine (preventive maintenance)

Depending on the chosen path, different question sets appear:

**For the Design path:**
- What type of contact pair are you designing? (gear, shaft & bushing, ball bearing, cam & follower, disc & pad, wheel & rail, piston & cylinder, mechanical seal, propeller & housing, wire rope & pulley, etc.)
- For unusual contact pairs, additional questions specify the dominant contact geometry (point, line, or conformal surface), relative motion type (rolling, sliding, combined, stationary, impact, oscillating, or particle-laden fluid), and lubricant type (fluid, grease, solid, or dry)
- Is this a completely new design or a modification of an existing one?
- If modifying: what were the failure modes of the previous design? (gradual surface wear, sudden fracture or cracking, corrosion or rust, overheating or melting, vibration/noise/instability, contamination-induced wear, cavitation damage, electrical discharge damage, particle erosion, or other/unknown)

**For the Troubleshooting path:**
- Which component failed?
- For unusual components: contact geometry, motion type, and lubricant details
- For disc/pad, wheel/rail, or rod/die pairs: process temperature, relative speed, and lubricant type are also collected
- Could this failure cause injury, explosion, or catastrophic collapse?
- How urgent is the situation? (Critical — immediate safety threat or risk of collapse/explosion / Urgent — complete production stoppage / High — reduced production capacity / Standard — no impact on production or safety)
- What is the impact on production?
- Is this the first occurrence or a recurring problem?
- If recurring: what was the outcome of the previous solution? (successful but problem returned / never effective / undocumented / made things worse)

The system automatically assigns a priority level based on safety and production impact. A conservative triage logic is applied: if the user answers "I don't know" to safety-related questions, the worst case is assumed.

**Safety recommendations are displayed by priority level:**

- 🔴 Critical — Immediate warning: isolate and stop the machine. Do not restart until full analysis is complete
- 🟠 Urgent — Production stoppage warning: analyze with maximum speed. Do not restart until root cause is identified
- 🟡 High — Production reduction warning: prioritize analysis. Cautious operation under supervision is permitted
- 🔵 Standard — Routine analysis: follow normal procedures

**For the Monitoring path:**
- What does the latest oil analysis report show? (increased wear metals Fe, Cu, Pb, Al / decreased chemical properties TBN, TAN, viscosity / increased silicon or external contaminants / all parameters normal / report not available)
- What does the latest vibration monitoring report show? (increased amplitude at main frequencies / new abnormal frequencies / all normal / report not available)

If oil analysis or vibration reports are unavailable, the system warns that diagnosis accuracy may be reduced and recommends:
- Shorter lubricant replacement intervals
- Reduced wear mechanism detection accuracy
- Initiation of periodic oil analysis and vibration monitoring programs

- Have there been recent changes in operating conditions? (load increase/decrease, speed increase/decrease, ambient temperature increase/decrease, humidity or dust increase/decrease, operator or work method change, maintenance or part replacement, raw material supplier or spare part quality change, lubricant type or brand change, no changes)

If changes are detected, the system recommends shorter monitoring intervals.

### Step 2: Shape, Material & Surface Conditions

The second step collects detailed engineering data about the contacting parts.

**Component identification:**

- Component 1 (moving or primary) — automatically extracted from Step 1 selections for Design and Troubleshooting paths; manually selected for Monitoring path
- Component 2 (stationary or counter-surface) — automatically matched for Design and Monitoring paths; manually selected for Troubleshooting path (options include counter-gear, bushing/bearing, inner/outer ring, follower, cylinder, counter-pad, rail, seat, die, shaft, counter-disc, connection surface, particle-laden fluid, turbine guide vane, roller backup, or other)

For unusual components, additional properties are collected: role (stationary/moving/both) and surface geometry (cylindrical/flat/spherical/complex).

**Mechanical and thermal properties (20 values for each component):**

- Elastic modulus E (GPa)
- Poisson's ratio ν
- Yield strength σy (MPa)
- Hardness HB
- Fracture toughness KIC (MPa√m)
- Thermal conductivity k (W/m·K)
- Density ρ (kg/m³)
- Specific heat c (J/kg·K)
- Melting temperature T_melt (°C)
- Thickness t (mm)

All 20 values must be entered before proceeding.

**Contact geometry:**

The system automatically identifies the geometry type based on the component pair:
- Conformal cylindrical (shaft & bushing, piston & cylinder)
- Conformal flat (disc & pad, mechanical seal faces)
- Non-conformal point contact (ball & ring)
- Non-conformal line contact (gear teeth, roller & ring, cam & follower, wheel & rail)
- Non-conformal elliptical (certain wheel & rail profiles)

The user can confirm or override this auto-detection. For manual overrides, exact curvature radii (R1x, R1y, R2x, R2y), characteristic contact length (L), nominal contact area (A), and angle between principal axes (α) are collected.

**Surface roughness and operating conditions (13 parameters):**

- Ra₁, Rz₁, Rq₁, Rsk₁, Rku₁ (Component 1 surface roughness)
- Ra₂, Rz₂, Rq₂, Rsk₂, Rku₂ (Component 2 surface roughness)
- Normal load F (N)
- Relative speed U (m/s)
- Ambient temperature T (°C)

Combined RMS roughness is automatically calculated: σ = √(Rq₁² + Rq₂²)

**Wear pattern identification (Troubleshooting and Monitoring paths only):**

The user selects from 9 wear pattern families:
1. No damage / healthy surface
2. Abrasive wear — scratches, grooves, scoring
3. Adhesive wear — polished surface, galling, material transfer
4. Contact fatigue — pits, spalls, cracks
5. Corrosion — discoloration, rust
6. Cavitation — irregular sharp-edged cavities
7. Particle erosion — directional cavities
8. Fretting — oxide powder
9. Other specific mechanisms (melting, electrical discharge, impact wear, diffusion wear, stick-slip)

After selecting the family, the user picks the exact pattern subtype. For example, if the family is "abrasive wear":
- Long parallel scratches (two-body abrasion)
- Short irregular scratches (three-body abrasion)
- Deep isolated grooves
- Polishing wear
- Fine scattered scratches

The system then automatically maps the observed pattern to the dominant wear mechanism. The user can:
- Confirm the system's diagnosis
- Completely override with any of 13 mechanisms (two-body abrasion, three-body abrasion, adhesive, fatigue, erosive, corrosive/oxidative, fretting, cavitation, electrical, diffusion, melting, impact, stick-slip)
- Accept the main mechanism but add additional contributing mechanisms

For corrosion or other specific mechanisms, supplementary evidence is collected: burning smell, discoloration, material penetration traces, or oxidation products.

If contact fatigue is identified as a mechanism, the user is asked whether subsurface cracks have been examined, found present, found absent, or not yet investigated.

**Relative motion type (Troubleshooting path only):**
- Unidirectional sliding
- Reciprocating sliding
- Pure rolling
- Combined rolling-sliding
- Small-amplitude oscillation (< 300 µm, fretting risk)
- Repeated impact
- Stationary (no relative motion)
- Particle-laden fluid flow (erosion)

**Environmental contaminants:**
- No contaminants (clean environment)
- Dust or abrasive particles
- Moisture or water
- Corrosive chemicals
- Metal particles from the process
- Corrosive or reactive gases

If particles or metal debris are present, the system checks for wear synergism — the combined effect of corrosion and abrasion that can cause failure within hours even with contamination levels below 0.01% by weight. Users report whether they observe iron oxide particles (brown-red) mixed with metal particles in the oil, abnormally fast wear rates, both, or neither.

**Supplementary parameters (conditional):**
- Oscillation frequency (Hz) — if motion is oscillating
- Oscillation amplitude (mm) — if motion is oscillating
- Operating pressure (bar) — for propellers/housings/turbines
- Number of operating cycles — for Design path only
- Particle impact angle (°) — if contaminants include particles
- Particle flux rate (kg/m²·s) — if contaminants include particles
- Shaft vibrating mass (kg) — if Component 1 is a shaft
- Shaft support stiffness (N/m) — if Component 1 is a shaft

**Surface coatings and treatments:**

For both components, the user specifies whether a coating or surface treatment is applied:
- No coating
- Electroplating (hard chrome, nickel, cadmium)
- Nitriding
- Carburizing or carbonitriding
- Hard coating (DLC, TiN, CrN, AlCrN)
- Polymer coating or protective paint
- Solid lubricant coating (MoS₂, graphite, PTFE)

**Microstructure analysis (Troubleshooting and Monitoring paths only):**

Whether the metallurgical microstructure has been examined. If defects are found, the specific issue is identified: grain growth, unwanted phases, inclusions/impurities, microstructural cracks, surface hardness non-uniformity, surface decarburization, acicular structure, sigma phase, hydrogen embrittlement, porosity, intergranular corrosion, residual stresses, or white layer.

**Precise geometric parameters:**

Based on the component type, exact dimensions are collected:
- Journal bearing: D_shaft, D_bush, L_bearing, radial clearance c
- Ball bearing: R_ball, R_inner, R_outer
- Roller bearing: R_roller, L_roller
- Gear: R_pinion, R_gear, face width, pressure angle φ
- Cam: R_cam_base, R_follower, cam width
- Wheel & rail: R_wheel, R_rail_x, R_rail_y
- Mechanical seal: R_seal, seal width, A_seal
- Piston & cylinder: D_piston, D_cylinder, L_piston, ring clearance
- Other: R1x, R1y, R2x, R2y, contact length L

### Step 3: Lubrication System Design & Troubleshooting

The third step handles everything related to the lubrication system.

**Contact stress calculation (automatic):**

The system calculates maximum contact stress (p_max) using Hertz formulas and displays it alongside the yield strength of the softer material:

- For line contact: b = √(4FR'/(πLE')), p_max = 2F/(πbL)
- For point contact: a = (3FR'/E')^(1/3), p_max = 3F/(2πa²)

The ratio p_max/σy is shown for immediate assessment of plastic deformation risk.

**Special operating conditions:**

Before recommending a lubrication system, special conditions that override normal selection logic are collected:
- High fire risk → eliminates mineral oils and hydrocarbons, prioritizes emulsions or solid lubricants
- Ultra-high precision requirements (µm-level) → eliminates hydrodynamic (vibration) and grease (noise), prioritizes aerostatic
- Frequent start-stop cycles → eliminates pure hydrodynamic and pure EHL, prioritizes hybrid or hydrostatic
- Vacuum or corrosive environment → eliminates all oils and greases, only solid lubricants remain
- Maintenance-free requirement → prioritizes grease or solid lubricants
- None of the above → uses standard logic based on speed, load, temperature, and contact stress

**Lubrication regime recommendation:**

Based on special conditions combined with operating parameters, the system recommends the ideal lubrication regime from 10 options:

1. Hydrodynamic
2. Hydrostatic
3. Elastohydrodynamic (EHL)
4. Boundary lubrication
5. Solid lubricant
6. Hybrid
7. Gas dynamic
8. Aerostatic
9. Grease lubrication
10. Emulsion

The logic flow:
- If vacuum/corrosive → only solid lubricant
- If fire risk → exclude hydrodynamic with mineral oil
- If ultra-precision → exclude hydrodynamic and grease
- If start-stop → exclude pure hydrodynamic and pure EHL
- If maintenance-free → prioritize grease and solid lubricant
- If speed ≈ 0: high load → hydrostatic; precision needed → aerostatic; otherwise → solid lubricant
- If p_max > 1 GPa: non-conformal → EHL; conformal → hydrodynamic
- If temperature > 200°C → solid lubricant or gas dynamic
- If oscillating/impact motion → squeeze film
- Default: conformal + U > 0.1 + F < 100 kN → hydrodynamic; non-conformal + F > 1 kN → EHL; otherwise → boundary

The eliminated systems and the reasons for elimination are displayed. The user can confirm the recommendation or manually select a different regime.

**Device status routing (automatic):**
- Design path → skips directly to supply equipment section
- Troubleshooting and Monitoring paths → continues to diagnostic checklist

**Diagnostic checklist (Troubleshooting and Monitoring paths only):**

First, the user indicates whether the current lubrication system has any issues. If yes, the specific problem is selected from a 19-item checklist:

1. Wrong mechanism selected (grease instead of oil, or vice versa)
2. Insufficient pressure or flow (low gauge pressure, oil not reaching component)
3. Contaminated fluid inlet (dirty lubricant, water-mixed, discolored)
4. Clogged filters (high differential pressure, particles in oil)
5. Oil leaks (oil on floor, oil stains)
6. Foaming (foam on oil surface, large bubbles)
7. High fluid temperature (hot pipes, steam from reservoir)
8. Corrosion or deposit buildup (deposits on filter, rust inside pipes)
9. Wrong viscosity (oil too thin or too thick)
10. Aeration — dissolved gas bubbles (milky oil, fine persistent bubbles)
11. Worn or damaged pump (abnormal noise, pressure fluctuation)
12. Blocked pipes or grooves (oil not reaching all points)
13. Inadequate reservoir design (oil heats up quickly or foams)
14. Poor sealing (dust or water ingress into system)
15. Oil starvation (insufficient oil reaching the contact)
16. Hot oil carry-over (hot oil from previous pad enters next pad)
17. Chemical reaction with seals (swollen, cracked, or dissolved seals)
18. Friction polymer formation (brown polymer layer on surfaces)
19. Evaporation loss (continuous oil level decrease without visible leaks)

For each identified problem, the system displays the recommended solution with textbook page references.

**Supply equipment specification (automatic):**

Based on the selected lubrication regime, required supply equipment is specified:
- Hydrostatic: High-pressure pump, fine filters (≤ 5 µm), pressurized reservoir, flow restrictors
- Hybrid: High-pressure pump (for start) + hydrodynamic system (for running) + automatic control valves
- Aerostatic: Air compressor, compressed air filters (≤ 1 µm), air dryer, precision pressure regulator
- Grease: Grease pump (manual or electric), one-way valves, short large-diameter pipes
- Solid lubricant: Application equipment depending on method selected
- Emulsion: Water-oil mixing system, special emulsion pump, special filter, temperature control system, anti-bacterial system

**Grease system type (conditional):**
- Manual grease nipple
- Centralized grease system

**Solid lubricant application method (conditional):**
- Spraying — simple, low-cost, 3-10 µm film
- Brushing — local repairs, manual control
- Dip coating — small simple parts
- Burnishing — temporary, poor adhesion
- Sputtering — high precision, requires vacuum, ~200 nm film
- Ion-plating — excellent adhesion, aerospace-grade, requires vacuum

For traditional methods (spraying, brushing, dip coating, burnishing), the application procedure is displayed: degreasing with solvent, sandblasting with 220-mesh alumina, applying thin lubricant layer, drying (air-cured or heat-cured at ~200°C), and gradual running-in.

**Inlet groove design:**

For the Design path: groove recommendations are displayed based on operating conditions — groove type, position (90° from load line in unloaded zone), length, recessed edges, and depth for hydrostatic applications.

For the Troubleshooting path: if blocked pipes/grooves were identified as a problem, the user reports whether grooves are suitable, problematic (clogged, deposits, poor design), or unchecked.

For the Monitoring path: users inspect grooves for abnormal leakage, cavitation at groove downstream, clogging or deposits, and edge damage.

**Filter check:**

- Filters healthy and bypass closed (normal differential pressure, clean oil)
- Filters clogged (high differential pressure, bypass open) → refers to solution
- No filter system → refers to solution for filter installation

**Leak check:**

- No leaks
- Leaks from fittings (oil on floor, stains around fittings)
- Leaks from seals/glands (oil emerging from shaft)
- Leaks from reservoir or pipes (cracks or holes)

**Foam and aeration check:**

- Oil clear and transparent
- Surface foaming (large bubbles on surface, burst quickly) → caused by severe turbulence
- Aeration — fine bubbles (milky oil, persistent fine bubbles) → caused by suction in return line

**Temperature check:**

- Normal (pipes warm but not hot, T < 80°C)
- High (pipes hot, steam from reservoir, T = 80-100°C)
- Very high (pipes extremely hot, burning smell, oil blackened, T > 100°C) — critical overheating flag

**Maintenance plan (automatic):**

Based on all analyses, a maintenance plan is generated covering:
- Periodic lubricant replacement (required if wear synergism detected or λ < 1)
- Periodic filter replacement (required if wear synergism or particle contamination detected)
- Weekly visual inspection (always recommended)
- Periodic oil analysis (required if previous oil analysis unavailable or wear synergism detected)
- Online pressure and temperature monitoring (required if flash temperature exceeded or pressure anomalies detected)
- Grease re-lubrication intervals (for grease systems)
- Filter differential pressure monitoring (if cavitation detected)

### Step 4: Lubricant Selection & Film Analysis

The final step selects the specific lubricant and performs complete film analysis.

**Base lubricant type recommendation:**

Based on operating regime, temperature, and contaminants:
- Oil systems (hydrodynamic, hydrostatic, EHL, boundary, hybrid) below 100°C → Mineral oil
- Oil systems above 100°C → PAO or Ester
- Oil systems with significant water → PAG
- Solid lubricant in vacuum → MoS₂
- Solid lubricant above 400°C → Graphite
- Solid lubricant under high load → PTFE or soft metal coating
- Gas systems → Air
- Grease → Lithium grease
- Emulsion → Oil-in-Water (O/W)

The user can confirm or manually select from the full list for each regime type. If "other" is selected, a custom lubricant name can be entered.

**Viscosity calculation:**

Two methods are available:

- **Precise method:** Uses the Vogel equation with viscosity measured at three different temperatures, plus density data for the So & Klaus pressure-viscosity coefficient. The system warns that this requires laboratory data. Output: dynamic viscosity η₀, pressure-viscosity coefficient α, viscosity index VI, maximum operating temperature T_max.

- **Estimated method:** Uses only the ISO VG grade (marked on the oil barrel). The system estimates η₄₀ as (ISO VG) × 10⁻⁶ × 850 Pa·s, converts to operating temperature via Walter's equation, estimates α from textbook tables, and looks up VI and T_max from the database. The system warns this method has lower accuracy.

For grease systems, two analysis approaches are offered:
- Simple (Newtonian approximation): τ_p = 0, n = 1. Grease behaves like its base oil. h₀_grease ≈ 0.6 × h₀_oil (±20-30% for typical greases)
- Precise (Herschel-Bulkley model): Requires τ_p and n from datasheet. Solved via finite difference method.

**Film thickness analysis (automatic):**

The system calculates:
- Equivalent radius of curvature R' (from principal radii)
- Ellipticity parameter k (for point/elliptical contacts)
- Equivalent elastic modulus E'
- Dimensionless parameters: U_dim = η₀U/(E'R'), G = αE', W = F/(E'R'²)
- Lubrication regime classification via Gv and GE parameters:
  - Isoviscous-rigid (Gv < 0.1, GE < 0.1)
  - Piezoviscous-rigid (Gv > 0.1, GE < 0.1)
  - Isoviscous-elastic (Gv < 0.1, GE > 0.1)
  - Piezoviscous-elastic / EHL (Gv > 0.1, GE > 0.1)

Minimum film thickness h₀ is calculated using:
- Hamrock-Dowson formula for elliptical/point contacts:
  h₀ = 3.63 × R' × U_dim^0.68 × G^0.49 × W^(-0.073) × (1 - e^(-0.68k))
- Grubin formula for line contacts:
  h₀ = 1.657 × R' × (U_dim × η₀ × α / R')^0.727 × (F / (L × E' × R'))^(-0.0909)

Combined surface roughness: σ = √(Rq₁² + Rq₂²)

Lambda ratio: λ = h₀ / σ

Lambda interpretation:
- λ < 1 → Boundary lubrication — significant solid contact, severe wear
- 1 ≤ λ < 1.5 → Uncomfortable zone — risk of pitting and surface polishing
- 1.5 ≤ λ < 3 → Mixed lubrication — surface polishing possible, generally acceptable
- 3 ≤ λ < 4 → Full EHL film — complete surface separation, negligible wear
- λ ≥ 4 → Full and reliable EHL — guaranteed performance

For solid lubricants, film analysis is not applicable. Instead, the system displays the friction coefficient μ, maximum operating temperature, film thickness based on application method, and estimated film life.

**Cavitation and oil whirl check (conditional — when λ ≥ 3):**

Users inspect for:
- Cavitation — honeycomb cavities on surface, abnormal noise, surface erosion in severe cases
- Oil whirl — shaft vibration at 0.42-0.48 × shaft speed, whining noise, load fluctuation on gauge
- Both
- Neither (healthy surface, no vibration or abnormal noise)

**Flash temperature analysis (automatic):**

- Calculates thermal diffusivity: χ = k/(ρ × c) for both materials
- Calculates Peclet number: L = U × a / (2 × χ) for both surfaces
- Determines thermal regime (fast for L > 5, intermediate/slow otherwise)
- Computes flash temperature for each surface using regime-specific formulas:
  - Point/elliptical: Tf = 0.308 × μF|U₁-U₂| / (k × a) × √(U × a / χ)
  - Line contact: Tf = 0.266 × μF|U₁-U₂| / (k × l) × √(U × b / χ)
- Combines flash temperatures: 1/Tf_max = 1/Tf_A + 1/Tf_B
- Contact temperature: T_contact = T_ambient + Tf_max

Flags are set if T_contact exceeds T_max of the lubricant (FLASH_TEMP_EXCEEDED) or if T_contact exceeds 50% of the lower melting point of the two materials (MELTING_RISK).

**Elastic/plastic deformation analysis:**

The system evaluates whether detailed deformation analysis is needed by checking:
- t/L ratio (thin structures relative to contact length)
- Contact length L > 500 mm (large structures)
- Plasticity index ψ > 0.6
- p_max > 1.6σy

If analysis is required, results from the external DEFLECTION program can be entered for validation.

**Experimental measurement recommendation:**

If ψ > 0.6, t/L < 0.1, or λ < 3, the system recommends experimental validation. Methods are suggested based on the parameter to measure:
- Optical interferometry for film thickness h₀ (requires one transparent surface)
- Thin-film thermocouple for flash temperature (difficult to manufacture, low durability)
- Infrared spectroscopy for contact temperature (requires transparent surface)
- Combined methods for simultaneous thickness and temperature

If all parameters are within safe ranges, the system confirms that analytical estimation is sufficient.

**Actual vs. ideal regime comparison:**

The active lubrication regime (determined by λ) is compared to the ideal system recommended in Step 3. Any mismatch is flagged.

**Supply pressure and flow calculation:**

Calculation method depends on the lubrication regime:
- Hydrodynamic with L/D < 0.3 or L/D > 3 → analytical formula (Q = U × c × L × ε)
- Hydrodynamic with 0.3 < L/D < 3 → Raimondi-Boyd charts recommended
- Hydrostatic → Q = (πh₀³p_r) / (6η₀ ln(R/R₀))
- Aerostatic → Q = (πh₀³(p_r² - p_a²)) / (12η₀ ln(R/R₀)p_r)
- Hybrid → numerical analysis required
- Grease or emulsion → empirical estimation

Calculation type may be upgraded to numerical analysis if deformation is needed, non-Newtonian behavior is present, or temperature exceeds 100°C.

For existing systems (Troubleshooting and Monitoring paths), actual pressure and flow readings can be entered and compared to calculated values. Low pressure, high pressure, or low flow flags are set if readings deviate by more than ±20%.

**Viscosity grade selection:**

The recommended ISO VG grade is displayed and cross-checked against the previously selected lubricant. If contact temperature exceeds the lubricant's T_max, the system automatically suggests a replacement and asks the user to:
- Accept the new lubricant and grade (automatically returns to Step 4-1 for correction)
- Keep the original lubricant (with acknowledged risk, setting LUBRICANT_TYPE_MISMATCH flag)
- Only change the grade manually

**Additive package recommendation (for oil and emulsion systems):**

Based on operating conditions:
- λ > 3: Antioxidant, anti-rust, anti-foam
- 1 < λ < 3: Antioxidant, anti-wear (AW), anti-foam
- λ < 1: Antioxidant, extreme pressure (EP), anti-wear (AW), anti-foam
- T_contact > 0.8 × T_max: Enhanced antioxidants
- Water present: Rust inhibitor, demulsifier
- Wide temperature swings (VI < 100): VI improver
- Particle contamination: Detergent, dispersant
- Chemical corrosion: Corrosion inhibitor
- Low ambient temperature (T < -10°C): Pour point depressant

**Lubricant quantity:**

- Oil systems: Based on calculated flow rate Q
- Grease: Bearing should be completely filled; excess grease acts as seal against contamination and evaporation
- Solid lubricant: Thin layer — 3-10 µm for spray, ~0.2 µm for sputtering
- Gas: Based on calculated gas flow rate

**Replacement intervals (automatic):**

Base intervals are established by system type, then reduced by active flags:
- Flash temperature exceeded → 50% reduction
- Wear synergism detected → 70% reduction
- Particle contamination → 30% reduction
- Water contamination → 30% reduction
- No oil analysis available → 20% conservative reduction
- Metal contamination (Cu or Fe acting as oxidation catalysts) → 40% reduction

The system recommends adjusting intervals based on periodic oil analysis (TAN, TBN, particle count).

**Material compatibility check (automatic):**

The system cross-references the selected lubricant and additives against component materials:
- Bronze/brass + active sulfur EP additives → corrosion risk
- Aluminum + high TAN → acidic corrosion
- NBR seals + PAO/ester → swelling/shrinkage
- FKM (Viton) + ester above 200°C → degradation
- EPDM + mineral oil → swelling
- Lead/indium coating + sulfur EP → corrosion
- Silver coating + sulfur EP → corrosion

Compatible pairs are also displayed (NBR + mineral oil, FKM + mineral oil or PAO, PTFE + all lubricants).

**Root cause analysis (Troubleshooting and Monitoring paths):**

The system synthesizes all data and flags to propose the most probable failure cause from 10 options:
1. Insufficient lubrication
2. Excessive load
3. Inappropriate speed
4. Contamination
5. High temperature
6. Inappropriate material combination
7. Chemical corrosion
8. Vibration / instability
9. Assembly error
10. Unknown cause (requires further analysis)

The user can select multiple causes if combined mechanisms were identified in Step 2.

**Condition monitoring parameters:**

Automatic parameters (from calculations):
- Supply pressure P_supply (bar) — alarm at ±20% of design value
- Outlet temperature T_contact (°C) — alarm at 80°C
- Viscosity η₀ (Pa·s) — alarm at ±15% of initial value

Manual parameters (from oil analysis, optional):
- Fe particles (ppm) — warning at 100, critical at 200
- Cu particles (ppm) — warning at 50, critical at 100
- Si particles (ppm) — warning at 20, critical at 50
- Moisture (ppm) — warning at 500, critical at 1000
- TAN (mgKOH/g) — warning at +2 from baseline, critical at +4
- TBN (mgKOH/g) — warning at 50% of baseline, critical at 30%
- Fluid level (%) — warning below 50%, critical below 25%
- Filter differential pressure (bar) — warning at 1, critical at 2
- ISO 4406 cleanliness — warning at 20/18/15, critical at 22/20/17

**Seal compatibility:**

For oil and emulsion systems, the seal material is selected (NBR, FKM, EPDM, PTFE, or unknown). Compatibility with the chosen lubricant is automatically checked and displayed with textbook page references.

**Lubricant mixing:**

Whether the new lubricant will be mixed with the old one, the system will be flushed first, or this is a new system where mixing is not applicable. A warning is displayed that not all lubricants are safely miscible — mineral oils with PAO or ester may cause phase separation, VI reduction, and seal damage. A compatibility test is recommended before mixing.

**Quality control tests (for oil and emulsion systems):**

Recommended tests for fresh lubricant:
- Viscosity (ASTM D445) — essential
- VI (ASTM D2270) — essential
- TAN (ASTM D664) — essential
- TBN (ASTM D2896) — essential
- Density (ASTM D1298) — recommended
- Flash point (ASTM D92) — recommended
- Pour point (ASTM D97) — recommended
- ICP elemental analysis (ASTM D5185) — recommended
- Foaming tendency (ASTM D892) — recommended for high-circulation systems

Recommended tests for used lubricant (condition monitoring):
- Viscosity — warning at ±10%, critical at ±15%
- TAN — warning at +2, critical at +4
- TBN — warning at 50% of baseline, critical at 30%
- Water content — warning at 500 ppm, critical at 1000 ppm
- Fe — warning at 100 ppm, critical at 200 ppm
- Cu — warning at 50 ppm, critical at 100 ppm
- Si — warning at 20 ppm, critical at 50 ppm
- ISO 4406 — warning at 20/18/15, critical at 22/20/17

**Final report:**

Step 4 concludes with a comprehensive summary covering:
- Selected lubricant (type, grade, η₀, α, VI, T_max, non-Newtonian behavior)
- Film analysis (E', regime, h₀, σ, λ, film condition)
- Destructive phenomena (cavitation/oil whirl, flash temperature, plasticity index, deformation need, experimental measurement need)
- Supply system (calculation type, P_supply, Q_supply, actual pressure and flow comparison)
- Compatibility and maintenance (additive package, lubricant quantity, replacement intervals, material compatibility, seal compatibility, root cause)

---

## Project Structure

- index.html
- script.js
- style.css
- js/
  - calculations.js
  - router.js
  - state.js
  - translator.js
  - components/
    - resume-modal.js
    - reports/
      - report1.js
      - report2.js
      - report3.js
      - report4.js
    - step1/
      - question1-1.js
      - question1-2-1.js
      - question1-2-1a.js
      - question1-2-1b.js
      - question1-2-2.js
      - question1-2-3.js
      - question1-2-4.js
      - question1-3-1.js
      - question1-3-1a.js
      - question1-3-1b.js
      - question1-3-2a.js
      - question1-3-2b.js
      - question1-3-3.js
      - question1-3-4.js
      - question1-3-5.js
      - question1-4-1.js
      - question1-4-2.js
      - question1-4-3.js
    - step2/
      - question2-1.js
      - question2-1a.js
      - question2-1b.js
      - question2-2.js
      - question2-2a.js
      - question2-3.js
      - question2-5.js
      - question2-5a.js
      - question2-6.js
      - question2-8.js
      - question2-8-detail.js
      - question2-8a.js
      - question2-8b.js
      - question2-8c.js
      - question2-9.js
      - question2-13.js
      - question2-13a.js
      - question2-13b.js
      - question2-13c.js
      - question2-13d.js
      - question2-13e.js
      - question2-13f.js
      - question2-13g.js
      - question2-13h.js
      - question2-13i.js
      - question2-14.js
      - question2-15.js
      - question2-16.js
      - question2-16a.js
      - question2-geometry.js
    - step3/
      - question3-0.js
      - question3-1.js
      - question3-2.js
      - question3-4.js
      - question3-5.js
      - question3-6.js
      - question3-7.js
      - question3-7a.js
      - question3-7b.js
      - question3-8.js
      - question3-8-design.js
      - question3-9.js
      - question3-10.js
      - question3-11.js
      - question3-12.js
      - question3-13.js
    - step4/
      - question4-1.js
      - question4-1a.js
      - question4-2.js
      - question4-2-estimated.js
      - question4-2-precise.js
      - question4-2-gas.js
      - question4-3.js
      - question4-3-solid.js
      - question4-3-gas.js
      - question4-5.js
      - question4-6.js
      - question4-6-results.js
      - question4-7.js
      - question4-8.js
      - question4-9.js
      - question4-10.js
      - question4-11.js
      - question4-12.js
      - question4-13.js
      - question4-14.js
      - question4-15.js
      - question4-16.js
      - question4-17.js
      - question4-18.js
      - question4-19.js
      - question4-20.js
- locales/
  - en.json
  - fa.json

---

## Built With

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- No frameworks, no dependencies, no build tools

The entire system runs in the browser. All calculations are performed client-side. No server, no database, no API calls required.

---

## Live Demo

**[→ Try TEA Live Here ←](https://stvflwers-alt.github.io/tribology/)**

## 📝 Blog Post

Read the full story behind TEA — the engineering motivation, technical challenges, 
and lessons learned from building a tribology expert system from scratch:

→ [I Built a Tribology Expert System from Scratch — No Frameworks, No Backend, Just Vanilla JavaScript](https://dev.to/arashkabiri/i-built-a-tribology-expert-system-from-scratch-no-frameworks-no-backend-just-vanilla-javascript-5gad)

## Quick Start

**Prerequisites:**

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No Node.js, npm, or any other tools required

**Installation:**

1. Clone the repository:

git clone https://github.com/stvflwers-alt/tribology.git

2. Open the project folder:

cd tribology

3. Open index.html in your browser:
   - Double-click index.html in your file explorer, or
   - Right-click → Open with → your browser

That's it. The system is ready to use.

---

## Internationalization

The system supports multiple languages through JSON locale files. The default languages are:

- English (en.json)
- Farsi / Persian (fa.json)

The user interface supports right-to-left (RTL) layout for Farsi and other RTL languages.

Adding a new language requires only translating the corresponding JSON file — no code changes are needed. Any language in the world can be supported by creating a new locale file.

---

## Project Status

This project is a **beta release** — fully functional through all 4 steps with complete calculation logic, decision trees, and report generation. Some edge cases or unusual input combinations may produce unexpected results. Feedback and bug reports are welcome.

---

## License

MIT License

Copyright (c) 2026 Arash Kabiri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Contact

**Arash Kabiri**

- Email: stv.flwers@gmail.com
- LinkedIn: [linkedin.com/in/arash-kabiri-b09773418](https://www.linkedin.com/in/arash-kabiri-b09773418/)
- GitHub: [github.com/stvflwers-alt](https://github.com/stvflwers-alt)

---

## Acknowledgments

This system is built upon the theories, formulas, and decision frameworks presented in:

**Stachowiak, G.W. & Batchelor, A.W.** — *Engineering Tribology*

All design decisions, calculation methods, and troubleshooting logic are cross-referenced to specific chapters and pages of this textbook.

---

<div align="center">

*Built with dedication for the tribology and mechanical engineering community*

</div>
