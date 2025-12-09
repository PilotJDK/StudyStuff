const notesEl = document.getElementById('notes');
const searchInput = document.getElementById('search-notes');

function escapeRegExp(string) { return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function searchNotes(term) {
    const allUnits = notesEl.querySelectorAll('.unit');
    if (!term) {
        allUnits.forEach(u => u.style.display = 'block');
        document.querySelectorAll('.subunit').forEach(s => s.style.display = 'block');
        document.querySelectorAll('mark').forEach(m => {
            const text = m.textContent;
            m.replaceWith(document.createTextNode(text));
        });
        return;
    }

    const regex = new RegExp('(' + escapeRegExp(term) + ')', 'gi');

    allUnits.forEach(unit => {
        const subunits = unit.querySelectorAll('.subunit');
        let hasMatch = false;

        subunits.forEach(sub => {
            const text = sub.textContent.toLowerCase();
            if (text.includes(term.toLowerCase())) {
                hasMatch = true;
                sub.style.display = 'block';

                const strong = sub.querySelector('strong');
                const p = sub.querySelector('p');
                if (strong) strong.innerHTML = strong.textContent.replace(regex, '<mark>$1</mark>');
                if (p) p.innerHTML = p.textContent.replace(regex, '<mark>$1</mark>');
            } else {
                sub.style.display = 'none';
            }
        });

        unit.style.display = hasMatch ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', () => { searchNotes(searchInput.value.trim()); });

function buildUnitSelector() {
    const notesTree = document.getElementById('notes-tree');
    if (!notesTree) return;
    notesTree.innerHTML = '';

    const units = document.querySelectorAll('.unit');
    units.forEach(unit => {
        const unitId = unit.id;
        const unitTitle = unit.querySelector('h2').textContent;
        const subunits = unit.querySelectorAll('.subunit');

        const nItem = document.createElement('li');
        const nDiv = document.createElement('div'); nDiv.className = 'unit-item';
        const nSpan = document.createElement('span'); nSpan.textContent = unitTitle;
        nSpan.style.cursor = 'pointer';
        nSpan.onclick = () => { unit.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
        const nCb = document.createElement('input'); nCb.type = 'checkbox'; nCb.checked = true; nCb.dataset.unit = unitId; nCb.className = 'unit-checkbox';
        nDiv.appendChild(nSpan); nDiv.appendChild(nCb);
        nItem.appendChild(nDiv);

        subunits.forEach(sub => {
            const subItem = document.createElement('li');
            const subDiv = document.createElement('div'); subDiv.className = 'subunit-item';
            subDiv.textContent = sub.querySelector('strong').textContent;
            subDiv.style.cursor = 'pointer';
            subDiv.onclick = () => { sub.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
            subItem.appendChild(subDiv);
            nItem.appendChild(subItem);
        });

        notesTree.appendChild(nItem);
    });

    document.querySelectorAll('.unit-checkbox').forEach(cb => {
        cb.addEventListener('change', () => { 
            setTimeout(() => buildSessionQuestions(), 10);
        });
    });
}

const unit1Questions = [
    //un 1
    {
        id: 'u1q1', unit: 'unit1', type: 'multiple', q: 'Which process maintains stable internal conditions in organisms?',
        choices: ['Cellular respiration', 'Homeostasis', 'Photosynthesis', 'Diffusion'],
        answer: 1,
        explain: 'Homeostasis keeps internal conditions stable despite external changes.',
        explain_each: [
            'Cellular respiration produces ATP but does not regulate internal conditions.',
            'Correct — homeostasis maintains conditions like temperature, pH, and glucose levels.',
            'Photosynthesis converts light energy to chemical energy, not regulation.',
            'Diffusion moves molecules but is not a control system.'
        ]
    },

    {
        id: 'u1q2', unit: 'unit1', type: 'truefalse', q: 'Negative feedback mechanisms amplify the original stimulus.',
        choices: ['True', 'False'],
        answer: 1,
        explain: 'Negative feedback reduces or counteracts the original change.',
        explain_each: [
            'Incorrect — amplification is characteristic of positive feedback.',
            'Correct — negative feedback counteracts the original stimulus to restore balance.'
        ]
    },

    {
        id: 'u1q3', unit: 'unit1', type: 'multiple', q: 'Which organ releases insulin to lower blood glucose levels?',
        choices: ['Liver', 'Pancreas', 'Kidney', 'Small intestine'],
        answer: 1,
        explain: 'The pancreas produces insulin.',
        explain_each: [
            'The liver stores and releases glucose but does not produce insulin.',
            'Correct — pancreatic beta cells secrete insulin.',
            'The kidney filters blood and forms urine, not insulin.',
            'The small intestine absorbs nutrients, not endocrine hormones.'
        ]
    },

    {
        id: 'u1q4', unit: 'unit1', type: 'multiple', q: 'Which macromolecule is the primary long-term energy storage form in animals?',
        choices: ['Carbohydrates', 'Lipids', 'Proteins', 'Nucleic acids'],
        answer: 1,
        explain: 'Lipids store long-term energy.',
        explain_each: [
            'Carbohydrates provide short-term energy.',
            'Correct — triglycerides store long-term energy efficiently.',
            'Proteins serve structural and functional roles.',
            'Nucleic acids store genetic information.'
        ]
    },

    {
        id: 'u1q5', unit: 'unit1', type: 'selectall', q: 'Which are functions of proteins in cells?',
        choices: ['Catalysis', 'Energy long-term storage', 'Cell signaling', 'Structural support'],
        answer: [0, 2, 3],
        explain: 'Proteins act as enzymes, signals, and structural components.',
        explain_each: [
            'Correct — enzymes catalyze biochemical reactions.',
            'Incorrect — lipids are used for long-term energy storage.',
            'Correct — many hormones and receptors are proteins.',
            'Correct — proteins like collagen and keratin give structural support.'
        ]
    },

    {
        id: 'u1q6', unit: 'unit1', type: 'multiple', q: 'What bond forms between amino acids during protein synthesis?',
        choices: ['Hydrogen', 'Ionic', 'Peptide', 'Phosphodiester'],
        answer: 2,
        explain: 'Peptide bonds link amino acids.',
        explain_each: [
            'Hydrogen bonds stabilize structures but do not link amino acids.',
            'Ionic bonds occur between charged side chains, not the backbone.',
            'Correct — peptide bonds connect amino acids into polypeptides.',
            'Phosphodiester bonds link nucleotides, not amino acids.'
        ]
    },

    {
        id: 'u1q7', unit: 'unit1', type: 'truefalse', q: 'Enzymes increase activation energy to speed up reactions.',
        choices: ['True', 'False'],
        answer: 1,
        explain: 'Enzymes lower activation energy.',
        explain_each: [
            'Incorrect — enzymes reduce the energy barrier.',
            'Correct — lowering activation energy increases reaction rate.'
        ]
    },

    {
        id: 'u1q8', unit: 'unit1', type: 'multiple', q: 'Which condition most often causes enzyme denaturation?',
        choices: ['Optimal pH', 'Moderate temperature', 'High heat', 'Neutral substrate concentration'],
        answer: 2,
        explain: 'High heat disrupts enzyme structure.',
        explain_each: [
            'Optimal pH maintains enzyme shape.',
            'Moderate temperature supports activity.',
            'Correct — high heat breaks bonds maintaining enzyme shape.',
            'Substrate levels do not directly denature enzymes.'
        ]
    },

    {
        id: 'u1q9', unit: 'unit1', type: 'selectall', q: 'Which properties of water help regulate temperature in organisms?',
        choices: ['High specific heat', 'Polarity', 'Evaporation cooling', 'Hydrogen bonding'],
        answer: [0, 2, 3],
        explain: 'Water resists temperature change and cools via evaporation.',
        explain_each: [
            'Correct — high specific heat buffers temperature changes.',
            'Incorrect — polarity itself does not directly regulate temperature.',
            'Correct — evaporative cooling removes heat.',
            'Correct — hydrogen bonding contributes to heat stability.'
        ]
    },

    {
        id: 'u1q10', unit: 'unit1', type: 'multiple', q: 'Which feedback loop is involved in childbirth?',
        choices: ['Negative feedback', 'Positive feedback', 'Homeostatic inhibition', 'Competitive inhibition'],
        answer: 1,
        explain: 'Positive feedback increases contractions.',
        explain_each: [
            'Negative feedback reduces change.',
            'Correct — oxytocin release intensifies contractions until birth.',
            'Homeostatic inhibition is not the mechanism.',
            'Competitive inhibition is an enzyme concept.'
        ]
    },

      {
    id:'u1q11', unit:'unit1', type:'multiple', q:'What is the primary function of the cell membrane?',
    choices:['Store genetic material','Produce ATP','Regulate what enters and leaves the cell','Synthesize proteins'],
    answer:2,
    explain:'The cell membrane controls movement of substances into and out of the cell.',
    explain_each:[
      'The nucleus stores genetic material.',
      'Mitochondria produce ATP.',
      'Correct — the membrane is selectively permeable.',
      'Ribosomes synthesize proteins.'
    ]
  },

  {
    id:'u1q12', unit:'unit1', type:'truefalse', q:'Diffusion requires energy input from the cell.',
    choices:['True','False'],
    answer:1,
    explain:'Diffusion is a passive process.',
    explain_each:[
      'Incorrect — energy is not required.',
      'Correct — diffusion occurs down a concentration gradient.'
    ]
  },

  {
    id:'u1q13', unit:'unit1', type:'multiple', q:'Which transport mechanism uses ATP to move substances against their concentration gradient?',
    choices:['Diffusion','Facilitated diffusion','Osmosis','Active transport'],
    answer:3,
    explain:'Active transport requires ATP.',
    explain_each:[
      'Diffusion is passive.',
      'Facilitated diffusion does not use ATP.',
      'Osmosis is passive water movement.',
      'Correct — ATP powers pumps and transport proteins.'
    ]
  },

  {
    id:'u1q14', unit:'unit1', type:'selectall', q:'Which factors affect the rate of diffusion?',
    choices:['Temperature','Molecular size','Concentration gradient','Cell division rate'],
    answer:[0,1,2],
    explain:'Diffusion rate depends on temperature, size, and gradient.',
    explain_each:[
      'Correct — higher temperature increases kinetic energy.',
      'Correct — smaller molecules diffuse faster.',
      'Correct — steeper gradients increase diffusion rate.',
      'Incorrect — cell division does not affect diffusion speed.'
    ]
  },

  {
    id:'u1q15', unit:'unit1', type:'multiple', q:'What happens to an animal cell placed in a hypotonic solution?',
    choices:['Shrinks','Swells and may lyse','Remains unchanged','Becomes plasmolyzed'],
    answer:1,
    explain:'Water moves into the cell in hypotonic solutions.',
    explain_each:[
      'Shrinking occurs in hypertonic solutions.',
      'Correct — swelling and possible lysis occur.',
      'No net movement occurs in isotonic solutions.',
      'Plasmolysis occurs in plant cells, not animal cells.'
    ]
  },

  {
    id:'u1q16', unit:'unit1', type:'truefalse', q:'Osmosis is the diffusion of solutes across a membrane.',
    choices:['True','False'],
    answer:1,
    explain:'Osmosis is the diffusion of water.',
    explain_each:[
      'Incorrect — osmosis refers specifically to water.',
      'Correct — water moves across a selectively permeable membrane.'
    ]
  },

  {
    id:'u1q17', unit:'unit1', type:'multiple', q:'Which organelle modifies, sorts, and packages proteins?',
    choices:['Ribosome','Golgi apparatus','Mitochondrion','Lysosome'],
    answer:1,
    explain:'The Golgi apparatus processes and ships proteins.',
    explain_each:[
      'Ribosomes build proteins.',
      'Correct — Golgi modifies and packages proteins.',
      'Mitochondria produce ATP.',
      'Lysosomes digest waste.'
    ]
  },

  {
    id:'u1q18', unit:'unit1', type:'multiple', q:'Which structure contains digestive enzymes to break down waste in a cell?',
    choices:['Nucleus','Lysosome','Chloroplast','Centrosome'],
    answer:1,
    explain:'Lysosomes digest cellular waste.',
    explain_each:[
      'The nucleus stores DNA.',
      'Correct — lysosomes contain hydrolytic enzymes.',
      'Chloroplasts perform photosynthesis.',
      'Centrosomes organize microtubules.'
    ]
  },

  {
    id:'u1q19', unit:'unit1', type:'truefalse', q:'All cells contain a rigid cell wall.',
    choices:['True','False'],
    answer:1,
    explain:'Animal cells lack cell walls.',
    explain_each:[
      'Incorrect — only plants, fungi, and some prokaryotes have cell walls.',
      'Correct — animal cells have only a plasma membrane.'
    ]
  },

  {
    id:'u1q20', unit:'unit1', type:'multiple', q:'What is the main function of ribosomes?',
    choices:['Lipid synthesis','Protein synthesis','ATP production','DNA replication'],
    answer:1,
    explain:'Ribosomes translate mRNA into proteins.',
    explain_each:[
      'Smooth ER synthesizes lipids.',
      'Correct — ribosomes build proteins.',
      'Mitochondria make ATP.',
      'DNA replication happens in the nucleus.'
    ]
  },

  {
    id:'u1q21', unit:'unit1', type:'selectall', q:'Which structures are found in plant cells but not animal cells?',
    choices:['Cell wall','Chloroplast','Large central vacuole','Mitochondria'],
    answer:[0,1,2],
    explain:'Plant cells have unique structures for support and photosynthesis.',
    explain_each:[
      'Correct — cellulose walls give rigidity.',
      'Correct — chloroplasts carry out photosynthesis.',
      'Correct — large vacuoles store water and maintain turgor.',
      'Incorrect — mitochondria are present in both.'
    ]
  },

  {
    id:'u1q22', unit:'unit1', type:'multiple', q:'What is the role of ATP in cells?',
    choices:['Store genetic information','Provide structural support','Supply energy for cellular processes','Transport oxygen'],
    answer:2,
    explain:'ATP is the energy currency of the cell.',
    explain_each:[
      'DNA and RNA store genetic information.',
      'Proteins often provide structure.',
      'Correct — ATP releases energy when broken down.',
      'Hemoglobin transports oxygen, not ATP.'
    ]
  },

  {
    id:'u1q23', unit:'unit1', type:'truefalse', q:'Eukaryotic cells are generally larger and more complex than prokaryotic cells.',
    choices:['True','False'],
    answer:0,
    explain:'Eukaryotes have membrane-bound organelles.',
    explain_each:[
      'Correct — complexity comes from compartmentalization.',
      'Incorrect — prokaryotes are simpler and smaller.'
    ]
  },

  {
    id:'u1q24', unit:'unit1', type:'multiple', q:'Which organelle is responsible for cellular respiration?',
    choices:['Nucleus','Mitochondrion','Chloroplast','Rough ER'],
    answer:1,
    explain:'Mitochondria are the site of ATP production.',
    explain_each:[
      'The nucleus controls cell activities.',
      'Correct — mitochondria perform cellular respiration.',
      'Chloroplasts perform photosynthesis.',
      'Rough ER helps build proteins.'
    ]
  },

  {
    id:'u1q25', unit:'unit1', type:'selectall', q:'Which are examples of passive transport?',
    choices:['Diffusion','Facilitated diffusion','Active transport','Osmosis'],
    answer:[0,1,3],
    explain:'Passive transport requires no ATP.',
    explain_each:[
      'Correct — diffusion moves down a gradient.',
      'Correct — protein channels assist without energy.',
      'Incorrect — active transport requires ATP.',
      'Correct — osmosis is passive water movement.'
    ]
  },

    {
    id:'u1q26', unit:'unit1', type:'multiple', q:'Which structure controls the movement of substances into and out of the nucleus?',
    choices:['Nuclear pores','Ribosomes','Centrioles','Cell wall'],
    answer:0,
    explain:'Nuclear pores regulate transport between the nucleus and cytoplasm.',
    explain_each:[
      'Correct — nuclear pores allow selective transport of RNA and proteins.',
      'Ribosomes synthesize proteins.',
      'Centrioles organize the spindle.',
      'Cell walls provide support, not transport.'
    ]
  },
  {
    id:'u1q27', unit:'unit1', type:'truefalse', q:'Phospholipids form a bilayer with hydrophilic heads facing outward.',
    choices:['True','False'],
    answer:0,
    explain:'Phospholipids arrange with hydrophilic heads outward and hydrophobic tails inward.',
    explain_each:[
      'Correct — this arrangement creates the cell membrane structure.',
      'Incorrect — hydrophilic heads do not face inward.'
    ]
  },
  {
    id:'u1q28', unit:'unit1', type:'multiple', q:'Which component of the cytoskeleton is responsible for cell movement and intracellular transport?',
    choices:['Microtubules','Cell wall','Flagellin','Capsid'],
    answer:0,
    explain:'Microtubules help maintain shape and allow movement.',
    explain_each:[
      'Correct — microtubules form tracks for motor proteins.',
      'Cell walls are not part of the cytoskeleton.',
      'Flagellin is a bacterial protein, not a cytoskeleton component.',
      'Capsids are viral structures.'
    ]
  },
  {
    id:'u1q29', unit:'unit1', type:'multiple', q:'What is the function of the rough endoplasmic reticulum?',
    choices:['Lipid synthesis','Protein synthesis for secretion','ATP production','Waste digestion'],
    answer:1,
    explain:'Rough ER is studded with ribosomes that synthesize proteins.',
    explain_each:[
      'Smooth ER synthesizes lipids.',
      'Correct — proteins made here are often exported.',
      'Mitochondria produce ATP.',
      'Lysosomes digest waste.'
    ]
  },
  {
    id:'u1q30', unit:'unit1', type:'selectall', q:'Which factors influence enzyme activity?',
    choices:['pH','Temperature','Substrate concentration','Time of day'],
    answer:[0,1,2],
    explain:'Enzyme activity depends on pH, temperature, and substrate availability.',
    explain_each:[
      'Correct — enzymes have an optimal pH.',
      'Correct — temperature affects molecular collisions.',
      'Correct — more substrate increases reaction rate up to saturation.',
      'Incorrect — circadian time does not directly affect enzyme activity.'
    ]
  },
  {
    id:'u1q31', unit:'unit1', type:'truefalse', q:'ATP releases energy when a phosphate group is removed.',
    choices:['True','False'],
    answer:0,
    explain:'Hydrolysis of ATP releases usable energy.',
    explain_each:[
      'Correct — the bond breakage releases energy.',
      'Incorrect — ATP gains energy when formed, not when broken.'
    ]
  },
  {
    id:'u1q32', unit:'unit1', type:'multiple', q:'Which stage of the cell cycle involves DNA replication?',
    choices:['G1','S','G2','M'],
    answer:1,
    explain:'DNA synthesis occurs during S phase.',
    explain_each:[
      'G1 is growth phase.',
      'Correct — S phase duplicates chromosomes.',
      'G2 is preparation phase.',
      'M phase is mitosis.'
    ]
  },
  {
    id:'u1q33', unit:'unit1', type:'multiple', q:'What is the role of centrioles during cell division?',
    choices:['Digest waste','Produce ATP','Organize spindle fibers','Store genetic material'],
    answer:2,
    explain:'Centrioles help form the spindle apparatus.',
    explain_each:[
      'Lysosomes digest waste.',
      'Mitochondria produce ATP.',
      'Correct — spindle fibers separate chromosomes.',
      'The nucleus stores DNA.'
    ]
  },
  {
    id:'u1q34', unit:'unit1', type:'truefalse', q:'Plant cells contain chloroplasts for photosynthesis.',
    choices:['True','False'],
    answer:0,
    explain:'Chloroplasts capture light energy to make glucose.',
    explain_each:[
      'Correct — chloroplasts contain chlorophyll.',
      'Incorrect — plant cells do have chloroplasts.'
    ]
  },
  {
    id:'u1q35', unit:'unit1', type:'multiple', q:'Which molecule carries genetic instructions from DNA to ribosomes?',
    choices:['tRNA','mRNA','rRNA','DNA polymerase'],
    answer:1,
    explain:'mRNA transports instructions for protein synthesis.',
    explain_each:[
      'tRNA carries amino acids.',
      'Correct — mRNA copies DNA code.',
      'rRNA forms part of ribosomes.',
      'DNA polymerase replicates DNA.'
    ]
  },
  {
    id:'u1q36', unit:'unit1', type:'selectall', q:'Which are stages of mitosis?',
    choices:['Prophase','Metaphase','Anaphase','Telophase'],
    answer:[0,1,2,3],
    explain:'Mitosis consists of PMAT.',
    explain_each:[
      'Correct — chromosomes condense.',
      'Correct — chromosomes align.',
      'Correct — sister chromatids separate.',
      'Correct — nuclei reform.'
    ]
  },
  {
    id:'u1q37', unit:'unit1', type:'truefalse', q:'Cytokinesis divides the nucleus during cell division.',
    choices:['True','False'],
    answer:1,
    explain:'Cytokinesis divides the cytoplasm.',
    explain_each:[
      'Incorrect — that is mitosis.',
      'Correct — cytokinesis separates the cell.'
    ]
  },
  {
    id:'u1q38', unit:'unit1', type:'multiple', q:'Which structure helps maintain cell shape and organization?',
    choices:['Cytoskeleton','Nucleolus','Chromatin','Plasmid'],
    answer:0,
    explain:'The cytoskeleton provides structural support.',
    explain_each:[
      'Correct — it gives shape and aids transport.',
      'The nucleolus makes ribosomal RNA.',
      'Chromatin is DNA-protein complex.',
      'Plasmids are bacterial DNA.'
    ]
  },
  {
    id:'u1q39', unit:'unit1', type:'multiple', q:'What is the main purpose of the G1 phase of the cell cycle?',
    choices:['DNA replication','Cell growth','Chromosome separation','Cytokinesis'],
    answer:1,
    explain:'G1 is the primary growth phase.',
    explain_each:[
      'DNA replication occurs in S phase.',
      'Correct — the cell increases in size and function.',
      'Chromosome separation happens in anaphase.',
      'Cytokinesis separates the cytoplasm.'
    ]
  },
  {
    id:'u1q40', unit:'unit1', type:'selectall', q:'Which organelles are involved in protein processing and transport?',
    choices:['Rough ER','Golgi apparatus','Mitochondria','Transport vesicles'],
    answer:[0,1,3],
    explain:'Proteins move through the endomembrane system.',
    explain_each:[
      'Correct — rough ER synthesizes proteins.',
      'Correct — Golgi modifies and packages proteins.',
      'Incorrect — mitochondria make ATP.',
      'Correct — vesicles transport proteins.'
    ]
  },
  {
    id:'u1q41', unit:'unit1', type:'truefalse', q:'All living cells come from pre-existing cells.',
    choices:['True','False'],
    answer:0,
    explain:'Cell theory states cells arise from existing cells.',
    explain_each:[
      'Correct — this is a core principle of cell theory.',
      'Incorrect — spontaneous generation is not supported.'
    ]
  },
  {
    id:'u1q42', unit:'unit1', type:'multiple', q:'What is the function of the nucleolus?',
    choices:['DNA replication','Ribosome assembly','Lipid synthesis','ATP production'],
    answer:1,
    explain:'The nucleolus produces rRNA and assembles ribosomal subunits.',
    explain_each:[
      'DNA replication occurs in the nucleus, not the nucleolus.',
      'Correct — ribosomes are assembled here.',
      'Smooth ER synthesizes lipids.',
      'Mitochondria produce ATP.'
    ]
  },
  {
    id:'u1q43', unit:'unit1', type:'truefalse', q:'Facilitated diffusion requires ATP.',
    choices:['True','False'],
    answer:1,
    explain:'Facilitated diffusion is a passive process.',
    explain_each:[
      'Incorrect — no energy is used.',
      'Correct — transport proteins move molecules down gradients.'
    ]
  },
  {
    id:'u1q44', unit:'unit1', type:'multiple', q:'Which statement best describes a hypertonic solution?',
    choices:['Higher solute concentration than the cell','Equal solute concentration','Lower solute concentration','No solutes present'],
    answer:0,
    explain:'Hypertonic solutions have more solute outside the cell.',
    explain_each:[
      'Correct — water moves out of the cell.',
      'Isotonic solutions are equal.',
      'Hypotonic solutions have lower solute outside.',
      'Biological solutions always contain solutes.'
    ]
  },
  {
    id:'u1q45', unit:'unit1', type:'selectall', q:'Which molecules can freely pass through the lipid bilayer?',
    choices:['Oxygen','Carbon dioxide','Glucose','Ions'],
    answer:[0,1],
    explain:'Small nonpolar molecules diffuse directly.',
    explain_each:[
      'Correct — oxygen is small and nonpolar.',
      'Correct — carbon dioxide diffuses freely.',
      'Incorrect — glucose requires transporters.',
      'Incorrect — ions require channels.'
    ]
  },
  {
    id:'u1q46', unit:'unit1', type:'truefalse', q:'Smooth ER is primarily involved in lipid synthesis.',
    choices:['True','False'],
    answer:0,
    explain:'Smooth ER produces lipids.',
    explain_each:[
      'Correct — phospholipids and steroids are made here.',
      'Incorrect — rough ER handles proteins.'
    ]
  },
  {
    id:'u1q47', unit:'unit1', type:'multiple', q:'Which structure anchors the cytoskeleton to the cell membrane?',
    choices:['Desmosomes','Mitochondria','Lysosomes','Plasmodesmata'],
    answer:0,
    explain:'Desmosomes connect cells and anchor cytoskeleton fibers.',
    explain_each:[
      'Correct — they provide mechanical strength.',
      'Mitochondria produce ATP.',
      'Lysosomes digest waste.',
      'Plasmodesmata are plant cell channels.'
    ]
  },
  {
    id:'u1q48', unit:'unit1', type:'multiple', q:'What is a major difference between prokaryotic and eukaryotic cells?',
    choices:['Presence of ribosomes','Presence of cell membrane','Presence of membrane-bound organelles','Use of DNA'],
    answer:2,
    explain:'Eukaryotes have membrane-bound organelles.',
    explain_each:[
      'Both have ribosomes.',
      'Both have cell membranes.',
      'Correct — this is a defining difference.',
      'Both use DNA.'
    ]
  },
  {
    id:'u1q49', unit:'unit1', type:'truefalse', q:'Surface area-to-volume ratio limits cell size.',
    choices:['True','False'],
    answer:0,
    explain:'Larger cells struggle to exchange materials efficiently.',
    explain_each:[
      'Correct — diffusion becomes too slow in very large cells.',
      'Incorrect — cell size is limited by transport needs.'
    ]
  },
  {
    id:'u1q50', unit:'unit1', type:'multiple', q:'Which process converts chemical energy in glucose into ATP?',
    choices:['Photosynthesis','Cellular respiration','Fermentation','Diffusion'],
    answer:1,
    explain:'Cellular respiration produces ATP from glucose.',
    explain_each:[
      'Photosynthesis stores energy.',
      'Correct — glucose is broken down to make ATP.',
      'Fermentation produces small amounts of ATP without oxygen.',
      'Diffusion does not involve energy conversion.'
    ]
  }
];

const unit2Questions = [
  {
    id:'u2q1', unit:'unit2', type:'multiple', q:'What is the basic unit of life?',
    choices:['Tissue','Organ','Cell','Organism'],
    answer:2,
    explain:'The cell is the smallest unit that can carry out all life processes.',
    explain_each:[
      'Tissues are groups of similar cells.',
      'Organs are made of tissues.',
      'Correct — cells are the fundamental unit of life.',
      'Organisms are made of many cells or one cell.'
    ]
  },
  {
    id:'u2q2', unit:'unit2', type:'truefalse', q:'All cells arise from pre-existing cells.',
    choices:['True','False'],
    answer:0,
    explain:'This is a principle of cell theory.',
    explain_each:[
      'Correct — cells reproduce through division.',
      'Incorrect — spontaneous generation is disproven.'
    ]
  },
  {
    id:'u2q3', unit:'unit2', type:'multiple', q:'Which scientist is credited with naming the cell?',
    choices:['Darwin','Hooke','Mendel','Pasteur'],
    answer:1,
    explain:'Robert Hooke observed cork cells under a microscope.',
    explain_each:[
      'Darwin developed evolution theory.',
      'Correct — Hooke coined the term "cell" in 1665.',
      'Mendel studied genetics.',
      'Pasteur worked on germ theory.'
    ]
  },
  {
    id:'u2q4', unit:'unit2', type:'selectall', q:'Which are tenets of cell theory?',
    choices:['All living things are made of cells','Cells are the basic unit of life','All cells come from pre-existing cells','All cells have a nucleus'],
    answer:[0,1,2],
    explain:'Cell theory has three main principles.',
    explain_each:[
      'Correct — this is the first tenet.',
      'Correct — this is the second tenet.',
      'Correct — this is the third tenet.',
      'Incorrect — prokaryotes lack a nucleus.'
    ]
  },
  {
    id:'u2q5', unit:'unit2', type:'multiple', q:'Which structure is found in prokaryotic cells but not eukaryotic cells?',
    choices:['Nucleus','Nucleoid region','Mitochondria','Endoplasmic reticulum'],
    answer:1,
    explain:'Prokaryotes have DNA in a nucleoid, not a membrane-bound nucleus.',
    explain_each:[
      'Eukaryotes have a nucleus.',
      'Correct — prokaryotes have a nucleoid.',
      'Only eukaryotes have mitochondria.',
      'Only eukaryotes have an ER.'
    ]
  },
  {
    id:'u2q6', unit:'unit2', type:'truefalse', q:'Prokaryotic cells are generally larger than eukaryotic cells.',
    choices:['True','False'],
    answer:1,
    explain:'Prokaryotes are smaller and simpler.',
    explain_each:[
      'Incorrect — prokaryotes are typically smaller.',
      'Correct — eukaryotic cells are larger and more complex.'
    ]
  },
  {
    id:'u2q7', unit:'unit2', type:'multiple', q:'Which type of organism is always prokaryotic?',
    choices:['Plants','Animals','Bacteria','Fungi'],
    answer:2,
    explain:'Bacteria lack membrane-bound organelles.',
    explain_each:[
      'Plants are eukaryotic.',
      'Animals are eukaryotic.',
      'Correct — bacteria are prokaryotes.',
      'Fungi are eukaryotic.'
    ]
  },
  {
    id:'u2q8', unit:'unit2', type:'selectall', q:'Which organelles are found in eukaryotic cells?',
    choices:['Nucleus','Mitochondria','Chloroplasts','Ribosomes'],
    answer:[0,1,2,3],
    explain:'Eukaryotes have complex membrane-bound organelles.',
    explain_each:[
      'Correct — stores DNA.',
      'Correct — produces ATP.',
      'Correct — found in plant cells.',
      'Correct — though prokaryotes also have ribosomes.'
    ]
  },
  {
    id:'u2q9', unit:'unit2', type:'multiple', q:'What is the primary function of mitochondria?',
    choices:['Protein synthesis','ATP production','Photosynthesis','DNA storage'],
    answer:1,
    explain:'Mitochondria are the powerhouse of the cell.',
    explain_each:[
      'Ribosomes synthesize proteins.',
      'Correct — cellular respiration produces ATP.',
      'Chloroplasts perform photosynthesis.',
      'The nucleus stores DNA.'
    ]
  },
  {
    id:'u2q10', unit:'unit2', type:'truefalse', q:'Chloroplasts are found in animal cells.',
    choices:['True','False'],
    answer:1,
    explain:'Chloroplasts are unique to photosynthetic organisms.',
    explain_each:[
      'Incorrect — animals do not photosynthesize.',
      'Correct — only plant and algae cells have chloroplasts.'
    ]
  },
  {
    id:'u2q11', unit:'unit2', type:'multiple', q:'Which organelle contains digestive enzymes?',
    choices:['Lysosome','Ribosome','Golgi apparatus','Peroxisome'],
    answer:0,
    explain:'Lysosomes break down waste materials.',
    explain_each:[
      'Correct — lysosomes digest cellular debris.',
      'Ribosomes build proteins.',
      'Golgi packages and ships proteins.',
      'Peroxisomes break down fatty acids.'
    ]
  },
  {
    id:'u2q12', unit:'unit2', type:'selectall', q:'Which organelles are part of the endomembrane system?',
    choices:['Endoplasmic reticulum','Golgi apparatus','Lysosomes','Mitochondria'],
    answer:[0,1,2],
    explain:'The endomembrane system includes ER, Golgi, and vesicles.',
    explain_each:[
      'Correct — ER is central to the system.',
      'Correct — Golgi processes proteins.',
      'Correct — lysosomes are vesicles.',
      'Incorrect — mitochondria have separate origins.'
    ]
  },
  {
    id:'u2q13', unit:'unit2', type:'truefalse', q:'The rough ER is studded with ribosomes.',
    choices:['True','False'],
    answer:0,
    explain:'Ribosomes on rough ER synthesize proteins.',
    explain_each:[
      'Correct — this gives it a rough appearance.',
      'Incorrect — smooth ER lacks ribosomes.'
    ]
  },
  {
    id:'u2q14', unit:'unit2', type:'multiple', q:'What does the smooth ER primarily synthesize?',
    choices:['Proteins','Lipids','DNA','RNA'],
    answer:1,
    explain:'Smooth ER produces lipids and steroids.',
    explain_each:[
      'Ribosomes and rough ER make proteins.',
      'Correct — phospholipids and hormones are made here.',
      'DNA is synthesized in the nucleus.',
      'RNA is transcribed in the nucleus.'
    ]
  },
  {
    id:'u2q15', unit:'unit2', type:'multiple', q:'Which structure modifies and packages proteins for export?',
    choices:['Rough ER','Smooth ER','Golgi apparatus','Nucleus'],
    answer:2,
    explain:'The Golgi is the cell\'s shipping center.',
    explain_each:[
      'Rough ER makes proteins.',
      'Smooth ER makes lipids.',
      'Correct — Golgi modifies and sorts proteins.',
      'The nucleus contains DNA.'
    ]
  },
  {
    id:'u2q16', unit:'unit2', type:'truefalse', q:'Ribosomes are membrane-bound organelles.',
    choices:['True','False'],
    answer:1,
    explain:'Ribosomes are not surrounded by membranes.',
    explain_each:[
      'Incorrect — ribosomes lack membranes.',
      'Correct — they are complexes of RNA and protein.'
    ]
  },
  {
    id:'u2q17', unit:'unit2', type:'selectall', q:'Which structures are found only in plant cells?',
    choices:['Cell wall','Chloroplasts','Large central vacuole','Centrioles'],
    answer:[0,1,2],
    explain:'Plant cells have unique structures for support and photosynthesis.',
    explain_each:[
      'Correct — made of cellulose.',
      'Correct — for photosynthesis.',
      'Correct — stores water and maintains turgor.',
      'Incorrect — centrioles are in animal cells.'
    ]
  },
  {
    id:'u2q18', unit:'unit2', type:'multiple', q:'What is the main component of the plant cell wall?',
    choices:['Chitin','Cellulose','Peptidoglycan','Lignin'],
    answer:1,
    explain:'Cellulose provides structural strength.',
    explain_each:[
      'Chitin is found in fungal walls.',
      'Correct — cellulose is a polysaccharide.',
      'Peptidoglycan is in bacterial walls.',
      'Lignin strengthens woody tissue.'
    ]
  },
  {
    id:'u2q19', unit:'unit2', type:'truefalse', q:'Animal cells have cell walls.',
    choices:['True','False'],
    answer:1,
    explain:'Animal cells only have a plasma membrane.',
    explain_each:[
      'Incorrect — animals lack cell walls.',
      'Correct — only plant, fungal, and bacterial cells have walls.'
    ]
  },
  {
    id:'u2q20', unit:'unit2', type:'multiple', q:'Which organelle is responsible for photosynthesis?',
    choices:['Mitochondrion','Chloroplast','Vacuole','Peroxisome'],
    answer:1,
    explain:'Chloroplasts convert light energy to chemical energy.',
    explain_each:[
      'Mitochondria perform respiration.',
      'Correct — chloroplasts contain chlorophyll.',
      'Vacuoles store materials.',
      'Peroxisomes break down toxins.'
    ]
  },
  {
    id:'u2q21', unit:'unit2', type:'selectall', q:'Which are characteristics of prokaryotic cells?',
    choices:['Lack a nucleus','Have ribosomes','Circular DNA','Mitochondria present'],
    answer:[0,1,2],
    explain:'Prokaryotes are simpler than eukaryotes.',
    explain_each:[
      'Correct — DNA is in the nucleoid.',
      'Correct — all cells have ribosomes.',
      'Correct — prokaryotic DNA is circular.',
      'Incorrect — prokaryotes lack mitochondria.'
    ]
  },
  {
    id:'u2q22', unit:'unit2', type:'multiple', q:'What is the primary function of the central vacuole in plant cells?',
    choices:['Protein synthesis','Water storage','ATP production','DNA replication'],
    answer:1,
    explain:'The central vacuole maintains turgor pressure.',
    explain_each:[
      'Ribosomes make proteins.',
      'Correct — stores water, ions, and nutrients.',
      'Mitochondria produce ATP.',
      'The nucleus replicates DNA.'
    ]
  },
  {
    id:'u2q23', unit:'unit2', type:'truefalse', q:'Eukaryotic cells have linear chromosomes.',
    choices:['True','False'],
    answer:0,
    explain:'Eukaryotic DNA is organized into linear chromosomes.',
    explain_each:[
      'Correct — contained within the nucleus.',
      'Incorrect — prokaryotes have circular DNA.'
    ]
  },
  {
    id:'u2q24', unit:'unit2', type:'multiple', q:'Which organelle contains the cell\'s genetic material in eukaryotes?',
    choices:['Mitochondrion','Nucleus','Ribosome','Golgi apparatus'],
    answer:1,
    explain:'The nucleus houses chromosomes.',
    explain_each:[
      'Mitochondria have their own DNA but not the main genome.',
      'Correct — the nucleus contains chromosomes.',
      'Ribosomes translate RNA.',
      'Golgi processes proteins.'
    ]
  },
  {
    id:'u2q25', unit:'unit2', type:'selectall', q:'Which organelles have their own DNA?',
    choices:['Mitochondria','Chloroplasts','Nucleus','Lysosomes'],
    answer:[0,1],
    explain:'Mitochondria and chloroplasts have independent genomes.',
    explain_each:[
      'Correct — mitochondrial DNA.',
      'Correct — chloroplast DNA.',
      'Incorrect — nuclear DNA is the main genome.',
      'Incorrect — lysosomes lack DNA.'
    ]
  },
  {
    id:'u2q26', unit:'unit2', type:'truefalse', q:'The endosymbiotic theory explains the origin of mitochondria and chloroplasts.',
    choices:['True','False'],
    answer:0,
    explain:'These organelles were once free-living bacteria.',
    explain_each:[
      'Correct — evidence includes their own DNA and double membranes.',
      'Incorrect — the theory is well-supported.'
    ]
  },
  {
    id:'u2q27', unit:'unit2', type:'multiple', q:'Which structure controls what enters and exits the nucleus?',
    choices:['Nuclear envelope','Nuclear pores','Nucleolus','Chromatin'],
    answer:1,
    explain:'Nuclear pores regulate transport.',
    explain_each:[
      'The envelope surrounds the nucleus.',
      'Correct — pores allow selective passage.',
      'The nucleolus makes ribosomes.',
      'Chromatin is DNA and proteins.'
    ]
  },
  {
    id:'u2q28', unit:'unit2', type:'multiple', q:'What is the function of peroxisomes?',
    choices:['Protein synthesis','Break down fatty acids and toxins','DNA replication','ATP production'],
    answer:1,
    explain:'Peroxisomes detoxify harmful substances.',
    explain_each:[
      'Ribosomes make proteins.',
      'Correct — they contain enzymes for oxidation.',
      'The nucleus replicates DNA.',
      'Mitochondria produce ATP.'
    ]
  },
  {
    id:'u2q29', unit:'unit2', type:'truefalse', q:'Centrioles help organize the spindle apparatus during cell division.',
    choices:['True','False'],
    answer:0,
    explain:'Centrioles are found in animal cells.',
    explain_each:[
      'Correct — they organize microtubules.',
      'Incorrect — plant cells lack centrioles but still divide.'
    ]
  },
  {
    id:'u2q30', unit:'unit2', type:'selectall', q:'Which are components of the cytoskeleton?',
    choices:['Microfilaments','Microtubules','Intermediate filaments','Ribosomes'],
    answer:[0,1,2],
    explain:'The cytoskeleton provides structure and movement.',
    explain_each:[
      'Correct — made of actin.',
      'Correct — hollow tubes of tubulin.',
      'Correct — provide mechanical strength.',
      'Incorrect — ribosomes are not cytoskeletal.'
    ]
  },
  {
    id:'u2q31', unit:'unit2', type:'multiple', q:'What role do microtubules play in the cell?',
    choices:['Energy production','Structural support and transport','Protein synthesis','DNA storage'],
    answer:1,
    explain:'Microtubules form tracks for organelle movement.',
    explain_each:[
      'Mitochondria produce energy.',
      'Correct — they also form cilia and flagella.',
      'Ribosomes make proteins.',
      'The nucleus stores DNA.'
    ]
  },
  {
    id:'u2q32', unit:'unit2', type:'truefalse', q:'Flagella and cilia are made of microtubules.',
    choices:['True','False'],
    answer:0,
    explain:'Both structures contain a 9+2 arrangement of microtubules.',
    explain_each:[
      'Correct — this arrangement enables movement.',
      'Incorrect — they are microtubule-based.'
    ]
  },
  {
    id:'u2q33', unit:'unit2', type:'multiple', q:'Which process allows cells to become specialized for specific functions?',
    choices:['Differentiation','Respiration','Replication','Transcription'],
    answer:0,
    explain:'Differentiation produces different cell types.',
    explain_each:[
      'Correct — gene expression determines cell fate.',
      'Respiration produces energy.',
      'Replication copies DNA.',
      'Transcription makes RNA.'
    ]
  },
  {
    id:'u2q34', unit:'unit2', type:'selectall', q:'What factors influence cell differentiation?',
    choices:['Gene expression','Environmental signals','Transcription factors','Cell size'],
    answer:[0,1,2],
    explain:'Multiple factors guide differentiation.',
    explain_each:[
      'Correct — specific genes are turned on or off.',
      'Correct — signals from other cells matter.',
      'Correct — proteins regulate gene expression.',
      'Incorrect — size does not determine fate.'
    ]
  },
  {
    id:'u2q35', unit:'unit2', type:'truefalse', q:'All cells in a multicellular organism have the same DNA.',
    choices:['True','False'],
    answer:0,
    explain:'Differentiation comes from differential gene expression, not different DNA.',
    explain_each:[
      'Correct — but different genes are expressed.',
      'Incorrect — DNA is identical in somatic cells.'
    ]
  },
  {
    id:'u2q36', unit:'unit2', type:'multiple', q:'Which type of microscope uses light to view specimens?',
    choices:['Electron microscope','Light microscope','Scanning tunneling microscope','Atomic force microscope'],
    answer:1,
    explain:'Light microscopes magnify using lenses.',
    explain_each:[
      'Electron microscopes use electrons.',
      'Correct — visible light passes through specimens.',
      'STM images surfaces at atomic level.',
      'AFM scans surfaces with a probe.'
    ]
  },
  {
    id:'u2q37', unit:'unit2', type:'truefalse', q:'Electron microscopes provide higher resolution than light microscopes.',
    choices:['True','False'],
    answer:0,
    explain:'Electrons have shorter wavelengths.',
    explain_each:[
      'Correct — can visualize ultrastructure.',
      'Incorrect — electron microscopes are more powerful.'
    ]
  },
  {
    id:'u2q38', unit:'unit2', type:'multiple', q:'What is the role of the nucleolus?',
    choices:['DNA replication','Ribosome production','Lipid synthesis','Protein degradation'],
    answer:1,
    explain:'The nucleolus assembles ribosomal subunits.',
    explain_each:[
      'DNA replication occurs elsewhere in the nucleus.',
      'Correct — rRNA is synthesized here.',
      'Smooth ER makes lipids.',
      'Lysosomes degrade proteins.'
    ]
  },
  {
    id:'u2q39', unit:'unit2', type:'selectall', q:'Which safety equipment is essential in a biology lab?',
    choices:['Goggles','Lab coat','Gloves','Helmet'],
    answer:[0,1,2],
    explain:'Personal protective equipment prevents exposure.',
    explain_each:[
      'Correct — protects eyes from chemicals and biologicals.',
      'Correct — shields skin and clothing.',
      'Correct — prevents contact with hazardous materials.',
      'Incorrect — helmets are not typically used in bio labs.'
    ]
  },
  {
    id:'u2q40', unit:'unit2', type:'multiple', q:'What should you do first if a chemical spills on your skin?',
    choices:['Apply lotion','Rinse with water immediately','Wipe with a towel','Wait for instructions'],
    answer:1,
    explain:'Immediate rinsing dilutes and removes chemicals.',
    explain_each:[
      'Lotion can trap the chemical.',
      'Correct — flush for at least 15 minutes.',
      'Wiping spreads the chemical.',
      'Do not delay treatment.'
    ]
  },
  {
    id:'u2q41', unit:'unit2', type:'truefalse', q:'You should never pipette by mouth in a lab.',
    choices:['True','False'],
    answer:0,
    explain:'Mouth pipetting can cause ingestion of hazardous materials.',
    explain_each:[
      'Correct — always use a pipette bulb or pump.',
      'Incorrect — this is a serious safety violation.'
    ]
  },
  {
    id:'u2q42', unit:'unit2', type:'multiple', q:'Where should broken glass be disposed of?',
    choices:['Regular trash','Sharps container','Sink','Recycling bin'],
    answer:1,
    explain:'Sharps containers prevent injuries.',
    explain_each:[
      'Regular trash poses injury risk.',
      'Correct — designed for sharp objects.',
      'Never dispose of glass in sinks.',
      'Broken glass is not recyclable in labs.'
    ]
  },
  {
    id:'u2q43', unit:'unit2', type:'selectall', q:'What are proper procedures when handling hazardous chemicals?',
    choices:['Read MSDS','Wear PPE','Work in a fume hood if needed','Taste to identify'],
    answer:[0,1,2],
    explain:'Safety protocols reduce exposure risk.',
    explain_each:[
      'Correct — Material Safety Data Sheets provide hazard info.',
      'Correct — protective gear is essential.',
      'Correct — fume hoods ventilate toxic vapors.',
      'Incorrect — never taste chemicals.'
    ]
  },
  {
    id:'u2q44', unit:'unit2', type:'truefalse', q:'Long hair should be tied back in the lab.',
    choices:['True','False'],
    answer:0,
    explain:'Prevents hair from contacting flames or chemicals.',
    explain_each:[
      'Correct — safety precaution.',
      'Incorrect — loose hair is hazardous.'
    ]
  },
  {
    id:'u2q45', unit:'unit2', type:'multiple', q:'What is the correct way to smell a chemical?',
    choices:['Directly inhale','Waft vapors toward nose','Stick nose in container','Do not smell chemicals'],
    answer:1,
    explain:'Wafting reduces exposure to concentrated vapors.',
    explain_each:[
      'Direct inhalation is dangerous.',
      'Correct — gently fan vapors.',
      'Direct contact can cause harm.',
      'Some identification requires smelling, but carefully.'
    ]
  },
  {
    id:'u2q46', unit:'unit2', type:'selectall', q:'What information is found on an MSDS?',
    choices:['Hazard identification','First aid measures','Handling and storage','Recipe instructions'],
    answer:[0,1,2],
    explain:'MSDS provides comprehensive safety information.',
    explain_each:[
      'Correct — describes dangers.',
      'Correct — emergency response procedures.',
      'Correct — proper use guidelines.',
      'Incorrect — MSDS is for safety, not protocols.'
    ]
  },
  {
    id:'u2q47', unit:'unit2', type:'multiple', q:'Which biosafety level is required for work with highly infectious agents?',
    choices:['BSL-1','BSL-2','BSL-3','BSL-4'],
    answer:3,
    explain:'BSL-4 is the highest containment level.',
    explain_each:[
      'BSL-1 is for low-risk agents.',
      'BSL-2 is for moderate risk.',
      'BSL-3 is for serious pathogens.',
      'Correct — BSL-4 is for dangerous pathogens like Ebola.'
    ]
  },
  {
    id:'u2q48', unit:'unit2', type:'truefalse', q:'Autoclaves use heat and pressure to sterilize equipment.',
    choices:['True','False'],
    answer:0,
    explain:'Autoclaving kills all microorganisms.',
    explain_each:[
      'Correct — high temperature and pressure destroy microbes.',
      'Incorrect — autoclaves are effective sterilization tools.'
    ]
  },
  {
    id:'u2q49', unit:'unit2', type:'multiple', q:'What is sterile technique used for?',
    choices:['Increasing cell size','Preventing contamination','Enhancing microscopy','Measuring pH'],
    answer:1,
    explain:'Sterile technique maintains pure cultures.',
    explain_each:[
      'Technique does not affect cell size.',
      'Correct — prevents introduction of unwanted microbes.',
      'Microscopy uses different methods.',
      'pH measurement is separate.'
    ]
  },
  {
    id:'u2q50', unit:'unit2', type:'selectall', q:'Which are proper lab practices?',
    choices:['Label all containers','Clean workspace before and after','Eat and drink at lab bench','Report accidents immediately'],
    answer:[0,1,3],
    explain:'Good practices ensure safety and accuracy.',
    explain_each:[
      'Correct — prevents mix-ups.',
      'Correct — reduces contamination.',
      'Incorrect — no food or drink in lab.',
      'Correct — prompt reporting allows quick response.'
    ]
  }
];

const unit3Questions = [
  {
    id:'u3q1', unit:'unit3', type:'multiple', q:'What is chromatin made of?',
    choices:['DNA only','DNA and protein','RNA only','Lipids and carbohydrates'],
    answer:1,
    explain:'Chromatin consists of DNA wrapped around histone proteins.',
    explain_each:[
      'DNA is present but not alone.',
      'Correct — histones help package DNA.',
      'RNA is not the main component.',
      'Chromatin does not contain lipids or carbohydrates.'
    ]
  },
  {
    id:'u3q2', unit:'unit3', type:'truefalse', q:'Histones are proteins around which DNA wraps.',
    choices:['True','False'],
    answer:0,
    explain:'Histones form the core of nucleosomes.',
    explain_each:[
      'Correct — DNA coils around histone octamers.',
      'Incorrect — histones are essential for DNA packaging.'
    ]
  },
  {
    id:'u3q3', unit:'unit3', type:'multiple', q:'What is a nucleosome?',
    choices:['A nuclear pore','DNA wrapped around histones','A ribosomal subunit','A mitochondrial structure'],
    answer:1,
    explain:'Nucleosomes are the basic unit of chromatin.',
    explain_each:[
      'Nuclear pores regulate nuclear transport.',
      'Correct — the bead-like structure of chromatin.',
      'Ribosomes are separate structures.',
      'Mitochondria are organelles.'
    ]
  },
  {
    id:'u3q4', unit:'unit3', type:'selectall', q:'Which are true about chromosomes?',
    choices:['Consist of condensed chromatin','Visible during cell division','Contain genes','Made of RNA'],
    answer:[0,1,2],
    explain:'Chromosomes are the condensed form of DNA.',
    explain_each:[
      'Correct — chromatin condenses into chromosomes.',
      'Correct — most visible during mitosis.',
      'Correct — genes are DNA segments on chromosomes.',
      'Incorrect — chromosomes are DNA, not RNA.'
    ]
  },
  {
    id:'u3q5', unit:'unit3', type:'multiple', q:'What are telomeres?',
    choices:['Repetitive DNA at chromosome ends','Central regions of chromosomes','Protein coats','RNA molecules'],
    answer:0,
    explain:'Telomeres protect chromosome ends.',
    explain_each:[
      'Correct — they prevent degradation.',
      'Central regions are centromeres.',
      'Telomeres are DNA, not proteins.',
      'They are DNA, not RNA.'
    ]
  },
  {
    id:'u3q6', unit:'unit3', type:'truefalse', q:'Telomerase is active in most adult somatic cells.',
    choices:['True','False'],
    answer:1,
    explain:'Telomerase is mostly active in stem cells and cancer cells.',
    explain_each:[
      'Incorrect — most adult cells lack telomerase.',
      'Correct — limited activity in somatic cells.'
    ]
  },
  {
    id:'u3q7', unit:'unit3', type:'multiple', q:'What holds sister chromatids together?',
    choices:['Telomeres','Centromeres','Histones','Ribosomes'],
    answer:1,
    explain:'The centromere is the attachment point.',
    explain_each:[
      'Telomeres protect ends.',
      'Correct — centromeres join sister chromatids.',
      'Histones package DNA.',
      'Ribosomes make proteins.'
    ]
  },
  {
    id:'u3q8', unit:'unit3', type:'selectall', q:'Which modifications regulate gene expression?',
    choices:['Histone acetylation','Histone methylation','DNA replication','Telomere shortening'],
    answer:[0,1],
    explain:'Chemical modifications affect chromatin structure.',
    explain_each:[
      'Correct — acetylation typically activates genes.',
      'Correct — methylation can silence genes.',
      'Incorrect — replication copies DNA.',
      'Incorrect — telomere shortening is aging-related.'
    ]
  },
  {
    id:'u3q9', unit:'unit3', type:'truefalse', q:'DNA replication occurs during the S phase of interphase.',
    choices:['True','False'],
    answer:0,
    explain:'S phase is dedicated to DNA synthesis.',
    explain_each:[
      'Correct — chromosomes are duplicated.',
      'Incorrect — replication is in S phase.'
    ]
  },
  {
    id:'u3q10', unit:'unit3', type:'multiple', q:'Which enzyme unwinds the DNA double helix during replication?',
    choices:['DNA polymerase','Helicase','Ligase','Primase'],
    answer:1,
    explain:'Helicase breaks hydrogen bonds between bases.',
    explain_each:[
      'DNA polymerase adds nucleotides.',
      'Correct — helicase opens the helix.',
      'Ligase joins DNA fragments.',
      'Primase makes RNA primers.'
    ]
  },
  {
    id:'u3q11', unit:'unit3', type:'multiple', q:'What do single-strand binding proteins do?',
    choices:['Join Okazaki fragments','Stabilize separated DNA strands','Synthesize new DNA','Unwind the helix'],
    answer:1,
    explain:'SSBs prevent DNA from re-annealing.',
    explain_each:[
      'Ligase joins fragments.',
      'Correct — keep strands apart.',
      'DNA polymerase synthesizes DNA.',
      'Helicase unwinds.'
    ]
  },
  {
    id:'u3q12', unit:'unit3', type:'truefalse', q:'DNA polymerase can start synthesis without a primer.',
    choices:['True','False'],
    answer:1,
    explain:'Primase synthesizes short RNA primers to begin.',
    explain_each:[
      'Incorrect — a primer is required.',
      'Correct — DNA polymerase needs a 3\' OH group.'
    ]
  },
  {
    id:'u3q13', unit:'unit3', type:'selectall', q:'Which enzymes are involved in DNA replication?',
    choices:['Helicase','DNA polymerase','Ligase','RNA polymerase'],
    answer:[0,1,2],
    explain:'Multiple enzymes coordinate replication.',
    explain_each:[
      'Correct — unwinds DNA.',
      'Correct — adds nucleotides.',
      'Correct — seals nicks.',
      'Incorrect — transcribes RNA.'
    ]
  },
  {
    id:'u3q14', unit:'unit3', type:'multiple', q:'In which direction does DNA polymerase synthesize new DNA?',
    choices:['3\' to 5\'','5\' to 3\'','Both directions','Randomly'],
    answer:1,
    explain:'Nucleotides are added to the 3\' end.',
    explain_each:[
      'DNA polymerase cannot work this direction.',
      'Correct — synthesis is always 5\' to 3\'.',
      'Only one direction is possible.',
      'Synthesis is directional.'
    ]
  },
  {
    id:'u3q15', unit:'unit3', type:'truefalse', q:'The leading strand is synthesized continuously.',
    choices:['True','False'],
    answer:0,
    explain:'Leading strand follows helicase continuously.',
    explain_each:[
      'Correct — one continuous strand.',
      'Incorrect — lagging strand is discontinuous.'
    ]
  },
  {
    id:'u3q16', unit:'unit3', type:'multiple', q:'What are Okazaki fragments?',
    choices:['Fragments on the leading strand','Short DNA segments on the lagging strand','RNA primers','Protein segments'],
    answer:1,
    explain:'Lagging strand is synthesized in pieces.',
    explain_each:[
      'Leading strand is continuous.',
      'Correct — later joined by ligase.',
      'Primers are RNA, not fragments.',
      'Fragments are DNA.'
    ]
  },
  {
    id:'u3q17', unit:'unit3', type:'selectall', q:'What ensures DNA replication accuracy?',
    choices:['Proofreading by DNA polymerase','Complementary base pairing','Mismatch repair','Random nucleotide addition'],
    answer:[0,1,2],
    explain:'Multiple mechanisms maintain fidelity.',
    explain_each:[
      'Correct — polymerase checks each nucleotide.',
      'Correct — A-T and G-C pairing rules.',
      'Correct — repairs mistakes post-replication.',
      'Incorrect — addition is not random.'
    ]
  },
  {
    id:'u3q18', unit:'unit3', type:'truefalse', q:'DNA replication is semi-conservative.',
    choices:['True','False'],
    answer:0,
    explain:'Each new DNA molecule has one old and one new strand.',
    explain_each:[
      'Correct — proven by Meselson-Stahl experiment.',
      'Incorrect — not fully conservative or dispersive.'
    ]
  },
  {
    id:'u3q19', unit:'unit3', type:'multiple', q:'What is the first stage of mitosis?',
    choices:['Metaphase','Prophase','Anaphase','Telophase'],
    answer:1,
    explain:'Prophase initiates mitotic division.',
    explain_each:[
      'Metaphase is alignment.',
      'Correct — chromatin condenses.',
      'Anaphase is separation.',
      'Telophase is reformation.'
    ]
  },
  {
    id:'u3q20', unit:'unit3', type:'multiple', q:'During which phase do chromosomes line up at the cell equator?',
    choices:['Prophase','Metaphase','Anaphase','Telophase'],
    answer:1,
    explain:'Metaphase aligns chromosomes.',
    explain_each:[
      'Prophase condenses chromosomes.',
      'Correct — metaphase plate formation.',
      'Anaphase pulls chromatids apart.',
      'Telophase reforms nuclei.'
    ]
  },
  {
    id:'u3q21', unit:'unit3', type:'truefalse', q:'Sister chromatids separate during anaphase.',
    choices:['True','False'],
    answer:0,
    explain:'Anaphase pulls chromatids to opposite poles.',
    explain_each:[
      'Correct — spindle fibers shorten.',
      'Incorrect — separation is a key anaphase event.'
    ]
  },
  {
    id:'u3q22', unit:'unit3', type:'selectall', q:'What happens during telophase?',
    choices:['Nuclear membranes reform','Chromosomes decondense','Spindle fibers disassemble','Chromatids separate'],
    answer:[0,1,2],
    explain:'Telophase reverses prophase changes.',
    explain_each:[
      'Correct — two nuclei form.',
      'Correct — chromatin relaxes.',
      'Correct — spindle is no longer needed.',
      'Incorrect — separation is in anaphase.'
    ]
  },
  {
    id:'u3q23', unit:'unit3', type:'multiple', q:'What is cytokinesis?',
    choices:['Nuclear division','Cytoplasmic division','DNA replication','Chromosome condensation'],
    answer:1,
    explain:'Cytokinesis splits the cell into two.',
    explain_each:[
      'Nuclear division is mitosis.',
      'Correct — divides cytoplasm and organelles.',
      'DNA replication is in S phase.',
      'Condensation is in prophase.'
    ]
  },
  {
    id:'u3q24', unit:'unit3', type:'truefalse', q:'A cleavage furrow forms during cytokinesis in animal cells.',
    choices:['True','False'],
    answer:0,
    explain:'Animal cells pinch in at the equator.',
    explain_each:[
      'Correct — actin and myosin contract.',
      'Incorrect — plant cells use a cell plate.'
    ]
  },
  {
    id:'u3q25', unit:'unit3', type:'multiple', q:'How does cytokinesis differ in plant cells?',
    choices:['No cytokinesis occurs','Cleavage furrow forms','Cell plate forms','Membrane dissolves'],
    answer:2,
    explain:'Plant cells build a cell plate.',
    explain_each:[
      'Cytokinesis does occur.',
      'Animal cells use a furrow.',
      'Correct — vesicles fuse to form new wall.',
      'Membrane does not dissolve.'
    ]
  },
  {
    id:'u3q26', unit:'unit3', type:'selectall', q:'What are functions of mitosis?',
    choices:['Growth','Tissue repair','Asexual reproduction','Genetic variation'],
    answer:[0,1,2],
    explain:'Mitosis produces identical daughter cells.',
    explain_each:[
      'Correct — increases cell number.',
      'Correct — replaces damaged cells.',
      'Correct — some organisms reproduce this way.',
      'Incorrect — mitosis produces clones.'
    ]
  },
  {
    id:'u3q27', unit:'unit3', type:'truefalse', q:'Mitosis produces genetically identical cells.',
    choices:['True','False'],
    answer:0,
    explain:'Each daughter cell is a clone.',
    explain_each:[
      'Correct — same DNA as parent.',
      'Incorrect — meiosis introduces variation.'
    ]
  },
  {
    id:'u3q28', unit:'unit3', type:'multiple', q:'Where do spindle fibers attach to chromosomes?',
    choices:['Telomeres','Centromeres','Histones','Nucleosomes'],
    answer:1,
    explain:'Kinetochores at centromeres bind spindle fibers.',
    explain_each:[
      'Telomeres protect ends.',
      'Correct — attachment point.',
      'Histones package DNA.',
      'Nucleosomes are DNA-histone complexes.'
    ]
  },
  {
    id:'u3q29', unit:'unit3', type:'multiple', q:'What organelle organizes spindle fibers in animal cells?',
    choices:['Centrosome','Ribosome','Golgi apparatus','Lysosome'],
    answer:0,
    explain:'Centrosomes contain centrioles.',
    explain_each:[
      'Correct — nucleates microtubules.',
      'Ribosomes make proteins.',
      'Golgi packages proteins.',
      'Lysosomes digest waste.'
    ]
  },
  {
    id:'u3q30', unit:'unit3', type:'truefalse', q:'Plant cells lack centrioles.',
    choices:['True','False'],
    answer:0,
    explain:'Plant cells organize spindles without centrioles.',
    explain_each:[
      'Correct — spindle forms from other MTOCs.',
      'Incorrect — plants do not have centrioles.'
    ]
  },
  {
    id:'u3q31', unit:'unit3', type:'selectall', q:'What is required for proper chromosome separation?',
    choices:['Spindle checkpoint','Kinetochore attachment','Centromere function','Ribosome activity'],
    answer:[0,1,2],
    explain:'Multiple mechanisms ensure accurate segregation.',
    explain_each:[
      'Correct — monitors attachment.',
      'Correct — fibers must attach properly.',
      'Correct — holds chromatids together.',
      'Incorrect — ribosomes are not involved.'
    ]
  },
  {
    id:'u3q32', unit:'unit3', type:'multiple', q:'What does PCR stand for?',
    choices:['Polymerase Chain Reaction','Protein Chain Replication','Primary Cell Response','Plasmid Copy Ratio'],
    answer:0,
    explain:'PCR amplifies DNA sequences.',
    explain_each:[
      'Correct — exponentially copies DNA.',
      'Not the correct term.',
      'Not the correct term.',
      'Not the correct term.'
    ]
  },
  {
    id:'u3q33', unit:'unit3', type:'truefalse', q:'PCR requires a heat-stable DNA polymerase.',
    choices:['True','False'],
    answer:0,
    explain:'Taq polymerase withstands high temperatures.',
    explain_each:[
      'Correct — from thermophilic bacteria.',
      'Incorrect — regular polymerase would denature.'
    ]
  },
  {
    id:'u3q34', unit:'unit3', type:'multiple', q:'What is the purpose of gel electrophoresis?',
    choices:['Amplify DNA','Separate DNA by size','Sequence DNA','Synthesize proteins'],
    answer:1,
    explain:'DNA fragments migrate through a gel matrix.',
    explain_each:[
      'PCR amplifies DNA.',
      'Correct — smaller fragments move faster.',
      'Sequencing determines base order.',
      'Ribosomes synthesize proteins.'
    ]
  },
  {
    id:'u3q35', unit:'unit3', type:'selectall', q:'Which are applications of biotechnology?',
    choices:['Medical diagnostics','Genetic modification','Forensics','Photosynthesis'],
    answer:[0,1,2],
    explain:'Biotechnology manipulates biological systems.',
    explain_each:[
      'Correct — PCR detects pathogens.',
      'Correct — creates GMOs.',
      'Correct — DNA profiling.',
      'Incorrect — natural process.'
    ]
  },
  {
    id:'u3q36', unit:'unit3', type:'multiple', q:'What does CRISPR-Cas9 do?',
    choices:['Amplifies DNA','Edits genes','Sequences genomes','Clones organisms'],
    answer:1,
    explain:'CRISPR makes precise genomic edits.',
    explain_each:[
      'PCR amplifies.',
      'Correct — cuts and modifies DNA.',
      'Sequencing reads bases.',
      'Cloning reproduces organisms.'
    ]
  },
  {
    id:'u3q37', unit:'unit3', type:'truefalse', q:'Restriction enzymes cut DNA at specific sequences.',
    choices:['True','False'],
    answer:0,
    explain:'Each enzyme recognizes a specific motif.',
    explain_each:[
      'Correct — used in cloning.',
      'Incorrect — they are sequence-specific.'
    ]
  },
  {
    id:'u3q38', unit:'unit3', type:'multiple', q:'What is a plasmid?',
    choices:['A viral protein','A small circular DNA molecule','A type of ribosome','A cell membrane'],
    answer:1,
    explain:'Plasmids are used as cloning vectors.',
    explain_each:[
      'Plasmids are not proteins.',
      'Correct — found in bacteria.',
      'Ribosomes are RNA-protein complexes.',
      'Plasmids are DNA.'
    ]
  },
  {
    id:'u3q39', unit:'unit3', type:'selectall', q:'What are benefits of genetically modified crops?',
    choices:['Increased yield','Pest resistance','Drought tolerance','Faster photosynthesis'],
    answer:[0,1,2],
    explain:'GMOs can have enhanced traits.',
    explain_each:[
      'Correct — more food production.',
      'Correct — reduces pesticide use.',
      'Correct — survives dry conditions.',
      'Incorrect — photosynthesis rate is complex.'
    ]
  },
  {
    id:'u3q40', unit:'unit3', type:'truefalse', q:'DNA fingerprinting can identify individuals.',
    choices:['True','False'],
    answer:0,
    explain:'Unique patterns distinguish people.',
    explain_each:[
      'Correct — used in forensics.',
      'Incorrect — DNA profiles are unique.'
    ]
  },
  {
    id:'u3q41', unit:'unit3', type:'multiple', q:'What is gene cloning?',
    choices:['Making identical organisms','Copying a specific gene','Deleting a gene','Transcribing RNA'],
    answer:1,
    explain:'Gene cloning produces many copies of a gene.',
    explain_each:[
      'Organismal cloning is different.',
      'Correct — inserts gene into vector.',
      'Deletion removes genes.',
      'Transcription makes RNA.'
    ]
  },
  {
    id:'u3q42', unit:'unit3', type:'selectall', q:'Which steps are in gene cloning?',
    choices:['Cut DNA with restriction enzymes','Insert into vector','Transform host cells','Perform mitosis'],
    answer:[0,1,2],
    explain:'Cloning involves cutting, inserting, and growing.',
    explain_each:[
      'Correct — creates compatible ends.',
      'Correct — plasmid carries gene.',
      'Correct — bacteria take up plasmid.',
      'Incorrect — mitosis is not a cloning step.'
    ]
  },
  {
    id:'u3q43', unit:'unit3', type:'truefalse', q:'Transgenic organisms contain genes from other species.',
    choices:['True','False'],
    answer:0,
    explain:'Transgenic means foreign DNA inserted.',
    explain_each:[
      'Correct — examples include insulin-producing bacteria.',
      'Incorrect — transgenic organisms are common.'
    ]
  },
  {
    id:'u3q44', unit:'unit3', type:'multiple', q:'Which organism is commonly used to produce human insulin?',
    choices:['Yeast','E. coli bacteria','Wheat','Mice'],
    answer:1,
    explain:'Bacteria can be engineered to make human proteins.',
    explain_each:[
      'Yeast is also used but less common for insulin.',
      'Correct — transformed with human insulin gene.',
      'Wheat is not used for insulin.',
      'Mice are not used for commercial insulin.'
    ]
  },
  {
    id:'u3q45', unit:'unit3', type:'multiple', q:'What is the role of ligase in cloning?',
    choices:['Cuts DNA','Joins DNA fragments','Amplifies DNA','Transcribes RNA'],
    answer:1,
    explain:'Ligase seals the recombinant DNA.',
    explain_each:[
      'Restriction enzymes cut.',
      'Correct — forms phosphodiester bonds.',
      'PCR amplifies.',
      'RNA polymerase transcribes.'
    ]
  },
  {
    id:'u3q46', unit:'unit3', type:'truefalse', q:'DNA sequencing determines the order of nucleotides.',
    choices:['True','False'],
    answer:0,
    explain:'Sequencing reads the genetic code.',
    explain_each:[
      'Correct — methods include Sanger and next-gen.',
      'Incorrect — sequencing reveals base order.'
    ]
  },
  {
    id:'u3q47', unit:'unit3', type:'selectall', q:'Which are ethical concerns with biotechnology?',
    choices:['Safety of GMOs','Privacy of genetic data','Gene editing in humans','Cost of microscopes'],
    answer:[0,1,2],
    explain:'Biotechnology raises important ethical questions.',
    explain_each:[
      'Correct — environmental and health impacts.',
      'Correct — potential for misuse.',
      'Correct — germline editing concerns.',
      'Incorrect — microscope cost is not an ethical issue.'
    ]
  },
  {
    id:'u3q48', unit:'unit3', type:'multiple', q:'What is a potential medical application of CRISPR?',
    choices:['Correcting genetic diseases','Producing antibiotics','Imaging cells','Measuring pH'],
    answer:0,
    explain:'CRISPR can fix mutations.',
    explain_each:[
      'Correct — targets disease-causing genes.',
      'Antibiotics are chemically synthesized.',
      'Imaging uses different technology.',
      'pH measurement is not CRISPR-related.'
    ]
  },
  {
    id:'u3q49', unit:'unit3', type:'truefalse', q:'Biotechnology is only used in medicine.',
    choices:['True','False'],
    answer:1,
    explain:'Biotechnology has many applications.',
    explain_each:[
      'Incorrect — also agriculture, industry, forensics.',
      'Correct — diverse uses.'
    ]
  },
  {
    id:'u3q50', unit:'unit3', type:'multiple', q:'What is recombinant DNA?',
    choices:['DNA from one species only','DNA combined from different sources','RNA converted to DNA','Damaged DNA'],
    answer:1,
    explain:'Recombinant DNA merges sequences from multiple organisms.',
    explain_each:[
      'Single-source DNA is not recombinant.',
      'Correct — engineered hybrid DNA.',
      'Reverse transcription makes DNA from RNA.',
      'Damaged DNA is not recombinant.'
    ]
  }
];

const unit4Questions = [
  {
    id:'u4q1', unit:'unit4', type:'multiple', q:'What model describes the structure of the plasma membrane?',
    choices:['Lock and key','Fluid mosaic','Double helix','Central dogma'],
    answer:1,
    explain:'The fluid mosaic model shows membrane flexibility.',
    explain_each:[
      'Lock and key describes enzyme specificity.',
      'Correct — phospholipids and proteins form a mosaic.',
      'Double helix describes DNA structure.',
      'Central dogma is DNA to RNA to protein.'
    ]
  },
  {
    id:'u4q2', unit:'unit4', type:'truefalse', q:'Phospholipid heads are hydrophobic.',
    choices:['True','False'],
    answer:1,
    explain:'Heads are hydrophilic; tails are hydrophobic.',
    explain_each:[
      'Incorrect — heads attract water.',
      'Correct — tails face inward away from water.'
    ]
  },
  {
    id:'u4q3', unit:'unit4', type:'selectall', q:'Which are components of the plasma membrane?',
    choices:['Phospholipids','Proteins','Cholesterol','DNA'],
    answer:[0,1,2],
    explain:'Membranes contain lipids, proteins, and cholesterol.',
    explain_each:[
      'Correct — form bilayer.',
      'Correct — integral and peripheral.',
      'Correct — stabilizes fluidity.',
      'Incorrect — DNA is in the nucleus.'
    ]
  },
  {
    id:'u4q4', unit:'unit4', type:'multiple', q:'What is the function of integral proteins?',
    choices:['Provide energy','Span the membrane','Store genetic information','Synthesize lipids'],
    answer:1,
    explain:'Integral proteins cross the entire membrane.',
    explain_each:[
      'ATP provides energy.',
      'Correct — act as channels and carriers.',
      'DNA stores information.',
      'Smooth ER makes lipids.'
    ]
  },
  {
    id:'u4q5', unit:'unit4', type:'truefalse', q:'Peripheral proteins are embedded in the lipid bilayer.',
    choices:['True','False'],
    answer:1,
    explain:'Peripheral proteins attach to membrane surfaces.',
    explain_each:[
      'Incorrect — they do not span the membrane.',
      'Correct — loosely attached to surfaces.'
    ]
  },
  {
    id:'u4q6', unit:'unit4', type:'multiple', q:'What role does cholesterol play in membranes?',
    choices:['Increases rigidity at high temperatures','Stores energy','Transports ions','Replicates DNA'],
    answer:0,
    explain:'Cholesterol modulates membrane fluidity.',
    explain_each:[
      'Correct — prevents excess fluidity and rigidity.',
      'Lipids store energy but not cholesterol\'s main role.',
      'Proteins transport ions.',
      'DNA polymerase replicates DNA.'
    ]
  },
  {
    id:'u4q7', unit:'unit4', type:'selectall', q:'What functions do membrane proteins perform?',
    choices:['Transport','Cell recognition','Signal reception','DNA replication'],
    answer:[0,1,2],
    explain:'Proteins have diverse membrane functions.',
    explain_each:[
      'Correct — channels and carriers.',
      'Correct — glycoproteins identify cells.',
      'Correct — receptors bind hormones.',
      'Incorrect — replication is nuclear.'
    ]
  },
  {
    id:'u4q8', unit:'unit4', type:'truefalse', q:'Carbohydrate chains on membranes help with cell recognition.',
    choices:['True','False'],
    answer:0,
    explain:'Glycoproteins and glycolipids identify cells.',
    explain_each:[
      'Correct — important for immune response.',
      'Incorrect — carbohydrates do aid recognition.'
    ]
  },
  {
    id:'u4q9', unit:'unit4', type:'multiple', q:'What is passive transport?',
    choices:['Movement requiring ATP','Movement down a gradient without energy','Active pumping','Vesicle formation'],
    answer:1,
    explain:'Passive transport uses concentration gradients.',
    explain_each:[
      'Active transport requires ATP.',
      'Correct — no energy input needed.',
      'Active pumping uses energy.',
      'Vesicle transport is bulk movement.'
    ]
  },
  {
    id:'u4q10', unit:'unit4', type:'truefalse', q:'Simple diffusion requires transport proteins.',
    choices:['True','False'],
    answer:1,
    explain:'Simple diffusion crosses the lipid bilayer directly.',
    explain_each:[
      'Incorrect — no proteins needed.',
      'Correct — small nonpolar molecules diffuse freely.'
    ]
  },
  {
    id:'u4q11', unit:'unit4', type:'selectall', q:'Which molecules use simple diffusion?',
    choices:['Oxygen','Carbon dioxide','Glucose','Water'],
    answer:[0,1],
    explain:'Small nonpolar molecules diffuse directly.',
    explain_each:[
      'Correct — O₂ is small and nonpolar.',
      'Correct — CO₂ crosses easily.',
      'Incorrect — glucose needs facilitated diffusion.',
      'Incorrect — water uses osmosis/aquaporins.'
    ]
  },
  {
    id:'u4q12', unit:'unit4', type:'multiple', q:'What is facilitated diffusion?',
    choices:['Active transport','Diffusion through proteins','Energy-requiring transport','Vesicle fusion'],
    answer:1,
    explain:'Proteins help polar molecules cross membranes.',
    explain_each:[
      'Active transport uses ATP.',
      'Correct — channels and carriers assist.',
      'Facilitated diffusion is passive.',
      'Vesicles are for bulk transport.'
    ]
  },
  {
    id:'u4q13', unit:'unit4', type:'truefalse', q:'Osmosis is the diffusion of water.',
    choices:['True','False'],
    answer:0,
    explain:'Water moves across membranes by osmosis.',
    explain_each:[
      'Correct — from high to low water concentration.',
      'Incorrect — osmosis is water-specific.'
    ]
  },
  {
    id:'u4q14', unit:'unit4', type:'multiple', q:'What are aquaporins?',
    choices:['Water channel proteins','Ion pumps','Glucose transporters','DNA sequences'],
    answer:0,
    explain:'Aquaporins facilitate rapid water movement.',
    explain_each:[
      'Correct — speed up osmosis.',
      'Ion pumps transport ions.',
      'GLUTs transport glucose.',
      'Aquaporins are proteins.'
    ]
  },
  {
    id:'u4q15', unit:'unit4', type:'selectall', q:'What factors affect diffusion rate?',
    choices:['Temperature','Concentration gradient','Molecular size','Nuclear envelope'],
    answer:[0,1,2],
    explain:'Diffusion depends on multiple factors.',
    explain_each:[
      'Correct — higher temperature increases rate.',
      'Correct — steeper gradients speed diffusion.',
      'Correct — smaller molecules move faster.',
      'Incorrect — nuclear envelope is not a diffusion factor.'
    ]
  },
  {
    id:'u4q16', unit:'unit4', type:'multiple', q:'What is active transport?',
    choices:['Movement down a gradient','Movement against a gradient using ATP','Passive diffusion','Osmosis'],
    answer:1,
    explain:'Active transport requires energy to move substances uphill.',
    explain_each:[
      'Passive transport goes down gradients.',
      'Correct — ATP powers pumps.',
      'Diffusion is passive.',
      'Osmosis is passive water movement.'
    ]
  },
  {
    id:'u4q17', unit:'unit4', type:'truefalse', q:'The sodium-potassium pump uses ATP.',
    choices:['True','False'],
    answer:0,
    explain:'This pump is a primary active transporter.',
    explain_each:[
      'Correct — pumps Na⁺ out and K⁺ in.',
      'Incorrect — it requires energy.'
    ]
  },
  {
    id:'u4q18', unit:'unit4', type:'multiple', q:'What does the sodium-potassium pump do?',
    choices:['Pumps 3 Na⁺ out and 2 K⁺ in','Pumps 2 Na⁺ out and 3 K⁺ in','Pumps equal Na⁺ and K⁺','Requires no energy'],
    answer:0,
    explain:'Maintains electrical balance across membranes.',
    explain_each:[
      'Correct — creates electrochemical gradient.',
      'Incorrect ratio.',
      'Incorrect — unequal pumping.',
      'Incorrect — uses ATP.'
    ]
  },
  {
    id:'u4q19', unit:'unit4', type:'selectall', q:'What are types of bulk transport?',
    choices:['Endocytosis','Exocytosis','Diffusion','Osmosis'],
    answer:[0,1],
    explain:'Bulk transport moves large particles.',
    explain_each:[
      'Correct — bringing materials in.',
      'Correct — expelling materials.',
      'Incorrect — diffusion is small-molecule transport.',
      'Incorrect — osmosis is water transport.'
    ]
  },
  {
    id:'u4q20', unit:'unit4', type:'truefalse', q:'Endocytosis brings materials into the cell.',
    choices:['True','False'],
    answer:0,
    explain:'Membrane engulfs external material.',
    explain_each:[
      'Correct — forms vesicles.',
      'Incorrect — exocytosis expels materials.'
    ]
  },
  {
    id:'u4q21', unit:'unit4', type:'multiple', q:'What is phagocytosis?',
    choices:['Drinking by cells','Eating by cells','Releasing vesicles','Passive diffusion'],
    answer:1,
    explain:'Phagocytosis engulfs large particles.',
    explain_each:[
      'Pinocytosis is cell drinking.',
      'Correct — "cell eating".',
      'Exocytosis releases vesicles.',
      'Phagocytosis is active.'
    ]
  },
  {
    id:'u4q22', unit:'unit4', type:'truefalse', q:'Exocytosis releases materials from the cell.',
    choices:['True','False'],
    answer:0,
    explain:'Vesicles fuse with the plasma membrane.',
    explain_each:[
      'Correct — secretes proteins and waste.',
      'Incorrect — endocytosis brings materials in.'
    ]
  },
  {
    id:'u4q23', unit:'unit4', type:'selectall', q:'Where does photosynthesis occur?',
    choices:['Chloroplasts','Thylakoid membranes','Stroma','Mitochondria'],
    answer:[0,1,2],
    explain:'Chloroplasts have two main reaction sites.',
    explain_each:[
      'Correct — organelle of photosynthesis.',
      'Correct — site of light reactions.',
      'Correct — site of Calvin cycle.',
      'Incorrect — mitochondria do respiration.'
    ]
  },
  {
    id:'u4q24', unit:'unit4', type:'multiple', q:'What is produced during the light-dependent reactions?',
    choices:['Glucose','ATP and NADPH','CO₂','Lactate'],
    answer:1,
    explain:'Light energy is converted to chemical energy.',
    explain_each:[
      'Glucose is made in Calvin cycle.',
      'Correct — energy carriers for Calvin cycle.',
      'CO₂ is consumed, not produced.',
      'Lactate is from fermentation.'
    ]
  },
  {
    id:'u4q25', unit:'unit4', type:'truefalse', q:'The Calvin cycle requires light directly.',
    choices:['True','False'],
    answer:1,
    explain:'Calvin cycle uses ATP and NADPH from light reactions.',
    explain_each:[
      'Incorrect — light-independent.',
      'Correct — indirectly depends on light products.'
    ]
  },
  {
    id:'u4q26', unit:'unit4', type:'multiple', q:'What is the primary output of the Calvin cycle?',
    choices:['Oxygen','Glucose (G3P)','ATP','Water'],
    answer:1,
    explain:'Calvin cycle fixes CO₂ into organic molecules.',
    explain_each:[
      'Oxygen is from light reactions.',
      'Correct — produces sugar precursors.',
      'ATP is consumed, not produced.',
      'Water is not the main output.'
    ]
  },
  {
    id:'u4q27', unit:'unit4', type:'selectall', q:'What are stages of cellular respiration?',
    choices:['Glycolysis','Krebs cycle','Electron transport chain','Calvin cycle'],
    answer:[0,1,2],
    explain:'Respiration extracts energy from glucose.',
    explain_each:[
      'Correct — breaks glucose to pyruvate.',
      'Correct — oxidizes acetyl-CoA.',
      'Correct — produces most ATP.',
      'Incorrect — Calvin cycle is in photosynthesis.'
    ]
  },
  {
    id:'u4q28', unit:'unit4', type:'multiple', q:'Where does glycolysis occur?',
    choices:['Mitochondrial matrix','Cytoplasm','Thylakoid membrane','Nucleus'],
    answer:1,
    explain:'Glycolysis happens outside mitochondria.',
    explain_each:[
      'Krebs cycle is in the matrix.',
      'Correct — first step of respiration.',
      'Thylakoids are in chloroplasts.',
      'The nucleus contains DNA.'
    ]
  },
  {
    id:'u4q29', unit:'unit4', type:'truefalse', q:'Glycolysis produces a small amount of ATP.',
    choices:['True','False'],
    answer:0,
    explain:'Glycolysis nets 2 ATP molecules.',
    explain_each:[
      'Correct — most ATP comes from ETC.',
      'Incorrect — glycolysis does produce ATP.'
    ]
  },
  {
    id:'u4q30', unit:'unit4', type:'multiple', q:'What is the role of oxygen in cellular respiration?',
    choices:['Substrate for glycolysis','Final electron acceptor','Produces glucose','Breaks down ATP'],
    answer:1,
    explain:'Oxygen accepts electrons at the end of the ETC.',
    explain_each:[
      'Glucose is the substrate.',
      'Correct — forms water.',
      'Photosynthesis produces glucose.',
      'ATP is hydrolyzed, not by O₂.'
    ]
  },
  {
    id:'u4q31', unit:'unit4', type:'selectall', q:'What are products of cellular respiration?',
    choices:['ATP','CO₂','Water','Glucose'],
    answer:[0,1,2],
    explain:'Respiration breaks down glucose completely.',
    explain_each:[
      'Correct — energy for cells.',
      'Correct — waste product.',
      'Correct — from oxygen reduction.',
      'Incorrect — glucose is the input.'
    ]
  },
  {
    id:'u4q32', unit:'unit4', type:'truefalse', q:'The Krebs cycle occurs in the mitochondrial matrix.',
    choices:['True','False'],
    answer:0,
    explain:'Also called the citric acid cycle.',
    explain_each:[
      'Correct — inner compartment of mitochondria.',
      'Incorrect — it is in the matrix.'
    ]
  },
  {
    id:'u4q33', unit:'unit4', type:'multiple', q:'What drives ATP synthesis in the electron transport chain?',
    choices:['Proton gradient','Direct phosphorylation','Glucose breakdown','Light energy'],
    answer:0,
    explain:'Chemiosmosis powers ATP synthase.',
    explain_each:[
      'Correct — H⁺ gradient creates force.',
      'Substrate-level happens in glycolysis and Krebs.',
      'Glucose is already broken down.',
      'Light is for photosynthesis.'
    ]
  },
  {
    id:'u4q34', unit:'unit4', type:'truefalse', q:'Fermentation occurs when oxygen is absent.',
    choices:['True','False'],
    answer:0,
    explain:'Fermentation regenerates NAD⁺ for glycolysis.',
    explain_each:[
      'Correct — anaerobic process.',
      'Incorrect — no oxygen required.'
    ]
  },
  {
    id:'u4q35', unit:'unit4', type:'selectall', q:'What are types of fermentation?',
    choices:['Lactic acid fermentation','Alcoholic fermentation','Oxidative phosphorylation','Krebs cycle'],
    answer:[0,1],
    explain:'Fermentation pathways vary by organism.',
    explain_each:[
      'Correct — occurs in muscles.',
      'Correct — occurs in yeast.',
      'Incorrect — requires oxygen.',
      'Incorrect — part of aerobic respiration.'
    ]
  },
  {
    id:'u4q36', unit:'unit4', type:'multiple', q:'What is the net ATP yield from glycolysis?',
    choices:['2 ATP','4 ATP','32 ATP','38 ATP'],
    answer:0,
    explain:'Glycolysis produces 4 but uses 2.',
    explain_each:[
      'Correct — net gain.',
      '4 gross, but 2 net.',
      'This is from full respiration.',
      'This is theoretical maximum.'
    ]
  },
  {
    id:'u4q37', unit:'unit4', type:'truefalse', q:'Most ATP from glucose is made in the electron transport chain.',
    choices:['True','False'],
    answer:0,
    explain:'ETC generates ~32-34 ATP molecules.',
    explain_each:[
      'Correct — oxidative phosphorylation.',
      'Incorrect — ETC is most productive.'
    ]
  },
  {
    id:'u4q38', unit:'unit4', type:'multiple', q:'What molecule enters the Krebs cycle?',
    choices:['Glucose','Pyruvate','Acetyl-CoA','Lactate'],
    answer:2,
    explain:'Pyruvate is converted to acetyl-CoA first.',
    explain_each:[
      'Glucose is split in glycolysis.',
      'Pyruvate is converted before Krebs.',
      'Correct — 2-carbon unit enters cycle.',
      'Lactate is from fermentation.'
    ]
  },
  {
    id:'u4q39', unit:'unit4', type:'selectall', q:'What are electron carriers in respiration?',
    choices:['NAD⁺','FAD','ATP','NADPH'],
    answer:[0,1],
    explain:'Carriers transport high-energy electrons.',
    explain_each:[
      'Correct — becomes NADH.',
      'Correct — becomes FADH₂.',
      'Incorrect — ATP is energy currency.',
      'Incorrect — NADPH is for photosynthesis.'
    ]
  },
  {
    id:'u4q40', unit:'unit4', type:'truefalse', q:'Chlorophyll absorbs light energy.',
    choices:['True','False'],
    answer:0,
    explain:'Chlorophyll captures photons.',
    explain_each:[
      'Correct — primarily absorbs red and blue light.',
      'Incorrect — chlorophyll is the main pigment.'
    ]
  },
  {
    id:'u4q41', unit:'unit4', type:'multiple', q:'What color light does chlorophyll reflect?',
    choices:['Red','Blue','Green','Yellow'],
    answer:2,
    explain:'Reflected light determines color we see.',
    explain_each:[
      'Red is absorbed.',
      'Blue is absorbed.',
      'Correct — green is reflected.',
      'Yellow is not primarily reflected.'
    ]
  },
  {
    id:'u4q42', unit:'unit4', type:'truefalse', q:'Photosynthesis and respiration are complementary processes.',
    choices:['True','False'],
    answer:0,
    explain:'Products of one are reactants of the other.',
    explain_each:[
      'Correct — O₂ and glucose cycle.',
      'Incorrect — they are interconnected.'
    ]
  },
  {
    id:'u4q43', unit:'unit4', type:'selectall', q:'What is needed for photosynthesis?',
    choices:['Light','CO₂','Water','Oxygen'],
    answer:[0,1,2],
    explain:'Photosynthesis requires light, CO₂, and H₂O.',
    explain_each:[
      'Correct — energy source.',
      'Correct — carbon source.',
      'Correct — electron source.',
      'Incorrect — O₂ is produced, not needed.'
    ]
  },
  {
    id:'u4q44', unit:'unit4', type:'multiple', q:'Where are photosystems located?',
    choices:['Stroma','Thylakoid membranes','Outer chloroplast membrane','Cytoplasm'],
    answer:1,
    explain:'Photosystems capture light energy.',
    explain_each:[
      'Stroma has Calvin cycle.',
      'Correct — embedded in thylakoid membranes.',
      'Outer membrane is permeable.',
      'Chloroplasts are in cytoplasm.'
    ]
  },
  {
    id:'u4q45', unit:'unit4', type:'truefalse', q:'Water is split during the light-dependent reactions.',
    choices:['True','False'],
    answer:0,
    explain:'Photolysis of water releases O₂.',
    explain_each:[
      'Correct — provides electrons and protons.',
      'Incorrect — water is indeed split.'
    ]
  },
  {
    id:'u4q46', unit:'unit4', type:'multiple', q:'What powers the Calvin cycle?',
    choices:['Light directly','ATP and NADPH','Glucose','Oxygen'],
    answer:1,
    explain:'Energy carriers from light reactions drive carbon fixation.',
    explain_each:[
      'Light reactions produce energy carriers.',
      'Correct — generated in thylakoids.',
      'Glucose is the product.',
      'Oxygen is a byproduct.'
    ]
  },
  {
    id:'u4q47', unit:'unit4', type:'selectall', q:'What do mitochondria and chloroplasts have in common?',
    choices:['Double membranes','Own DNA','Produce ATP','Found in all cells'],
    answer:[0,1,2],
    explain:'Both have endosymbiotic origins.',
    explain_each:[
      'Correct — inner and outer membranes.',
      'Correct — circular DNA.',
      'Correct — energy production.',
      'Incorrect — chloroplasts only in plants.'
    ]
  },
  {
    id:'u4q48', unit:'unit4', type:'truefalse', q:'ATP is the universal energy currency of cells.',
    choices:['True','False'],
    answer:0,
    explain:'ATP powers most cellular work.',
    explain_each:[
      'Correct — adenosine triphosphate.',
      'Incorrect — ATP is essential.'
    ]
  },
  {
    id:'u4q49', unit:'unit4', type:'multiple', q:'How many ATP are theoretically produced from one glucose molecule?',
    choices:['2','8','32-34','100'],
    answer:2,
    explain:'Total from glycolysis, Krebs, and ETC.',
    explain_each:[
      'Only from glycolysis.',
      'Too low.',
      'Correct — maximum yield.',
      'Too high.'
    ]
  },
  {
    id:'u4q50', unit:'unit4', type:'truefalse', q:'Fermentation produces more ATP than aerobic respiration.',
    choices:['True','False'],
    answer:1,
    explain:'Fermentation only nets 2 ATP per glucose.',
    explain_each:[
      'Incorrect — aerobic produces much more.',
      'Correct — aerobic respiration is more efficient.'
    ]
  }
];

const unit5Questions = [
  {
    id: 'u5q1', unit: 'unit5', type: 'multiple', q: 'Which type of population growth is represented by a J-shaped curve?',
    choices: ['Logistic growth', 'Exponential growth', 'Linear growth', 'Stable growth'],
    answer: 1,
    explain: 'Exponential growth occurs when resources are unlimited, producing a J-shaped curve.',
    explain_each: [
      'Logistic growth produces an S-shaped curve.',
      'Correct — rapid growth with unlimited resources.',
      'Populations rarely grow linearly.',
      'Stable growth implies zero population growth.'
    ]
  },
  {
    id: 'u5q2', unit: 'unit5', type: 'multiple', q: 'What does carrying capacity represent?',
    choices: ['Minimum population size', 'Maximum sustainable population size', 'Growth rate', 'Birth rate'],
    answer: 1,
    explain: 'Carrying capacity is the maximum number of individuals an environment can support.',
    explain_each: [
      'It is the maximum, not minimum.',
      'Correct — determined by available resources.',
      'It is a population limit, not a rate.',
      'It is not a birth rate.'
    ]
  },
  {
    id: 'u5q3', unit: 'unit5', type: 'selectall', q: 'Which are density-dependent limiting factors?',
    choices: ['Disease', 'Competition', 'Predation', 'Hurricanes'],
    answer: [0, 1, 2],
    explain: 'Density-dependent factors intensify as population density increases.',
    explain_each: [
      'Correct — spreads faster in dense populations.',
      'Correct — resources become scarcer.',
      'Correct — predators find prey easier.',
      'Incorrect — weather is density-independent.'
    ]
  },
  {
    id: 'u5q4', unit: 'unit5', type: 'truefalse', q: 'A forest fire is an example of a density-dependent limiting factor.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Natural disasters affect populations regardless of their density.',
    explain_each: [
      'Incorrect — fires are density-independent.',
      'Correct — it is density-independent.'
    ]
  },
  {
    id: 'u5q5', unit: 'unit5', type: 'multiple', q: 'In which symbiotic relationship do both species benefit?',
    choices: ['Parasitism', 'Commensalism', 'Mutualism', 'Predation'],
    answer: 2,
    explain: 'Mutualism is a win-win interaction.',
    explain_each: [
      'One benefits, one is harmed.',
      'One benefits, one is unaffected.',
      'Correct — both benefit (e.g., bees and flowers).',
      'One benefits (predator), one dies (prey).'
    ]
  },
  {
    id: 'u5q6', unit: 'unit5', type: 'multiple', q: 'What is a keystone species?',
    choices: ['The most abundant species', 'A species with a disproportionately large effect on its environment', 'An invasive species', 'A primary producer'],
    answer: 1,
    explain: 'Keystone species maintain community structure.',
    explain_each: [
      'Dominant species are most abundant.',
      'Correct — removal causes ecosystem collapse.',
      'Invasive species are non-native.',
      'Producers are important but not necessarily keystone.'
    ]
  },
  {
    id: 'u5q7', unit: 'unit5', type: 'truefalse', q: 'Primary succession occurs on soil that has been disturbed.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Primary succession starts on bare rock; secondary succession starts on soil.',
    explain_each: [
      'Incorrect — that is secondary succession.',
      'Correct — primary succession begins where no soil exists.'
    ]
  },
  {
    id: 'u5q8', unit: 'unit5', type: 'multiple', q: 'Which biome is characterized by low precipitation and extreme temperatures?',
    choices: ['Tropical rainforest', 'Desert', 'Tundra', 'Deciduous forest'],
    answer: 1,
    explain: 'Deserts are defined by aridity.',
    explain_each: [
      'Rainforests have high precipitation.',
      'Correct — hot or cold deserts are dry.',
      'Tundra is cold and dry but distinct.',
      'Deciduous forests have moderate rain.'
    ]
  },
  {
    id: 'u5q9', unit: 'unit5', type: 'selectall', q: 'What factors primarily determine a biome?',
    choices: ['Temperature', 'Precipitation', 'Longitude', 'Latitude'],
    answer: [0, 1, 3],
    explain: 'Climate (temp/precip) and latitude drive biome distribution.',
    explain_each: [
      'Correct — affects growing season.',
      'Correct — affects water availability.',
      'Incorrect — longitude has less effect.',
      'Correct — correlates with climate zones.'
    ]
  },
  {
    id: 'u5q10', unit: 'unit5', type: 'multiple', q: 'What happens when a population exceeds its carrying capacity?',
    choices: ['It continues to grow exponentially', 'The population crashes or stabilizes', 'Carrying capacity increases', 'Mutation rate increases'],
    answer: 1,
    explain: 'Overshoot leads to resource depletion and population decline.',
    explain_each: [
      'Impossible without resources.',
      'Correct — deaths exceed births.',
      'Carrying capacity usually decreases due to damage.',
      'Mutation rate is unrelated.'
    ]
  },
  {
    id: 'u5q11', unit: 'unit5', type: 'truefalse', q: 'Commensalism benefits one species while harming the other.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'In commensalism, one benefits and the other is unaffected.',
    explain_each: [
      'Incorrect — that describes parasitism.',
      'Correct — the other is neutral.'
    ]
  },
  {
    id: 'u5q12', unit: 'unit5', type: 'multiple', q: 'Which is an example of secondary succession?',
    choices: ['Growth after a volcanic eruption', 'Growth after a forest fire', 'Growth on a new island', 'Growth on a retreating glacier'],
    answer: 1,
    explain: 'Secondary succession occurs where soil remains.',
    explain_each: [
      'Primary succession (bare rock).',
      'Correct — soil is intact.',
      'Primary succession.',
      'Primary succession.'
    ]
  },
  {
    id: 'u5q13', unit: 'unit5', type: 'selectall', q: 'Which are examples of density-independent factors?',
    choices: ['Flood', 'Drought', 'Competition', 'Disease'],
    answer: [0, 1],
    explain: 'Abiotic factors often act independently of density.',
    explain_each: [
      'Correct — affects all individuals.',
      'Correct — weather-related.',
      'Incorrect — density-dependent.',
      'Incorrect — density-dependent.'
    ]
  },
  {
    id: 'u5q14', unit: 'unit5', type: 'multiple', q: 'What is the role of a pioneer species?',
    choices: ['To be the top predator', 'To colonize barren areas first', 'To decompose dead matter', 'To pollinate flowers'],
    answer: 1,
    explain: 'Pioneer species like lichens start primary succession.',
    explain_each: [
      'Predators come later.',
      'Correct — they create soil.',
      'Decomposers are important but not pioneers.',
      'Pollinators appear with plants.'
    ]
  },
  {
    id: 'u5q15', unit: 'unit5', type: 'truefalse', q: 'Logistic growth is more realistic for most populations than exponential growth.',
    choices: ['True', 'False'],
    answer: 0,
    explain: 'Environments have limits, making logistic growth the norm.',
    explain_each: [
      'Correct — resources are finite.',
      'Incorrect — exponential growth is temporary.'
    ]
  }
];

const unit6Questions = [
  {
    id: 'u6q1', unit: 'unit6', type: 'multiple', q: 'What is the process of copying DNA into mRNA called?',
    choices: ['Translation', 'Transcription', 'Replication', 'Transformation'],
    answer: 1,
    explain: 'Transcription synthesizes RNA from a DNA template.',
    explain_each: [
      'Translation makes proteins.',
      'Correct — occurs in the nucleus.',
      'Replication copies DNA.',
      'Transformation is bacterial uptake of DNA.'
    ]
  },
  {
    id: 'u6q2', unit: 'unit6', type: 'multiple', q: 'Where does translation occur in eukaryotic cells?',
    choices: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
    answer: 1,
    explain: 'Ribosomes are the site of protein synthesis.',
    explain_each: [
      'Transcription occurs in the nucleus.',
      'Correct — in the cytoplasm or on rough ER.',
      'Mitochondria produce energy.',
      'Golgi packages proteins.'
    ]
  },
  {
    id: 'u6q3', unit: 'unit6', type: 'truefalse', q: 'Introns are removed from pre-mRNA during processing.',
    choices: ['True', 'False'],
    answer: 0,
    explain: 'Introns are non-coding regions spliced out; exons are joined.',
    explain_each: [
      'Correct — splicing removes introns.',
      'Incorrect — they are removed.'
    ]
  },
  {
    id: 'u6q4', unit: 'unit6', type: 'multiple', q: 'Which molecule carries amino acids to the ribosome?',
    choices: ['mRNA', 'rRNA', 'tRNA', 'DNA'],
    answer: 2,
    explain: 'Transfer RNA (tRNA) brings specific amino acids.',
    explain_each: [
      'mRNA carries the code.',
      'rRNA makes up the ribosome.',
      'Correct — has an anticodon.',
      'DNA stays in the nucleus.'
    ]
  },
  {
    id: 'u6q5', unit: 'unit6', type: 'selectall', q: 'Which are differences between DNA and RNA?',
    choices: ['RNA is single-stranded', 'RNA contains uracil', 'RNA contains ribose sugar', 'RNA is double-stranded'],
    answer: [0, 1, 2],
    explain: 'RNA differs in structure, base composition, and sugar.',
    explain_each: [
      'Correct — DNA is double-stranded.',
      'Correct — replaces thymine.',
      'Correct — DNA has deoxyribose.',
      'Incorrect — RNA is typically single-stranded.'
    ]
  },
  {
    id: 'u6q6', unit: 'unit6', type: 'multiple', q: 'What is a codon?',
    choices: ['A sequence of 3 DNA bases', 'A sequence of 3 mRNA bases', 'A protein', 'An enzyme'],
    answer: 1,
    explain: 'A codon is a triplet of nucleotides on mRNA.',
    explain_each: [
      'DNA triplets are codes, codons are mRNA.',
      'Correct — codes for one amino acid.',
      'Proteins are made of amino acids.',
      'Enzymes are catalysts.'
    ]
  },
  {
    id: 'u6q7', unit: 'unit6', type: 'truefalse', q: 'A frameshift mutation affects only one amino acid.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Frameshifts shift the reading frame, changing all subsequent amino acids.',
    explain_each: [
      'Incorrect — it changes the entire downstream sequence.',
      'Correct — point mutations might affect only one.'
    ]
  },
  {
    id: 'u6q8', unit: 'unit6', type: 'multiple', q: 'What is the "Central Dogma" of biology?',
    choices: ['DNA -> RNA -> Protein', 'Protein -> RNA -> DNA', 'RNA -> DNA -> Protein', 'DNA -> Protein -> RNA'],
    answer: 0,
    explain: 'Information flows from DNA to RNA to Protein.',
    explain_each: [
      'Correct — the standard flow of genetic info.',
      'Reverse flow is rare (retroviruses).',
      'Incorrect order.',
      'Incorrect order.'
    ]
  },
  {
    id: 'u6q9', unit: 'unit6', type: 'selectall', q: 'What are types of point mutations?',
    choices: ['Substitution', 'Insertion', 'Deletion', 'Inversion'],
    answer: [0, 1, 2],
    explain: 'Point mutations affect one or a few nucleotides.',
    explain_each: [
      'Correct — swaps one base.',
      'Correct — adds a base (can cause frameshift).',
      'Correct — removes a base (can cause frameshift).',
      'Incorrect — inversion is a chromosomal mutation.'
    ]
  },
  {
    id: 'u6q10', unit: 'unit6', type: 'multiple', q: 'Which enzyme synthesizes mRNA?',
    choices: ['DNA polymerase', 'RNA polymerase', 'Helicase', 'Ligase'],
    answer: 1,
    explain: 'RNA polymerase builds the RNA strand.',
    explain_each: [
      'DNA polymerase replicates DNA.',
      'Correct — binds to promoter.',
      'Helicase unwinds DNA.',
      'Ligase joins DNA fragments.'
    ]
  },
  {
    id: 'u6q11', unit: 'unit6', type: 'truefalse', q: 'All mutations are harmful.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Mutations can be neutral, harmful, or beneficial.',
    explain_each: [
      'Incorrect — some drive evolution.',
      'Correct — many have no effect.'
    ]
  },
  {
    id: 'u6q12', unit: 'unit6', type: 'multiple', q: 'What is the start codon?',
    choices: ['UAA', 'UAG', 'AUG', 'UGA'],
    answer: 2,
    explain: 'AUG codes for methionine and starts translation.',
    explain_each: [
      'Stop codon.',
      'Stop codon.',
      'Correct — Start.',
      'Stop codon.'
    ]
  },
  {
    id: 'u6q13', unit: 'unit6', type: 'selectall', q: 'Which modifications happen to eukaryotic mRNA?',
    choices: ['5\' cap addition', 'Poly-A tail addition', 'Splicing', 'DNA replication'],
    answer: [0, 1, 2],
    explain: 'Processing stabilizes mRNA and removes introns.',
    explain_each: [
      'Correct — protects 5\' end.',
      'Correct — protects 3\' end.',
      'Correct — removes introns.',
      'Incorrect — replication is separate.'
    ]
  },
  {
    id: 'u6q14', unit: 'unit6', type: 'multiple', q: 'What binds to the codon?',
    choices: ['Anticodon', 'DNA', 'Amino acid', 'Promoter'],
    answer: 0,
    explain: 'The tRNA anticodon is complementary to the mRNA codon.',
    explain_each: [
      'Correct — on tRNA.',
      'DNA is the template.',
      'Amino acid is attached to tRNA.',
      'Promoter is on DNA.'
    ]
  },
  {
    id: 'u6q15', unit: 'unit6', type: 'truefalse', q: 'Gene expression can be influenced by the environment.',
    choices: ['True', 'False'],
    answer: 0,
    explain: 'Epigenetics and environmental factors affect expression.',
    explain_each: [
      'Correct — e.g., temperature affecting fur color.',
      'Incorrect — environment plays a role.'
    ]
  }
];

const unit7Questions = [
  {
    id: 'u7q1', unit: 'unit7', type: 'multiple', q: 'Who is considered the father of genetics?',
    choices: ['Charles Darwin', 'Gregor Mendel', 'James Watson', 'Francis Crick'],
    answer: 1,
    explain: 'Mendel established the laws of inheritance using pea plants.',
    explain_each: [
      'Darwin proposed natural selection.',
      'Correct — Austrian monk.',
      'Watson discovered DNA structure.',
      'Crick discovered DNA structure.'
    ]
  },
  {
    id: 'u7q2', unit: 'unit7', type: 'multiple', q: 'What is an allele?',
    choices: ['A type of protein', 'A variant form of a gene', 'A chromosome', 'A mutation'],
    answer: 1,
    explain: 'Alleles are different versions of the same gene (e.g., blue vs brown eyes).',
    explain_each: [
      'Proteins are gene products.',
      'Correct — dominant or recessive forms.',
      'Chromosomes contain genes.',
      'Mutations create alleles.'
    ]
  },
  {
    id: 'u7q3', unit: 'unit7', type: 'truefalse', q: 'A dominant allele is always expressed if present.',
    choices: ['True', 'False'],
    answer: 0,
    explain: 'Dominant alleles mask recessive ones in heterozygotes.',
    explain_each: [
      'Correct — represented by capital letters.',
      'Incorrect — it masks the recessive.'
    ]
  },
  {
    id: 'u7q4', unit: 'unit7', type: 'multiple', q: 'What is the genotype of a homozygous recessive individual?',
    choices: ['AA', 'Aa', 'aa', 'A'],
    answer: 2,
    explain: 'Homozygous means same alleles; recessive uses lowercase.',
    explain_each: [
      'Homozygous dominant.',
      'Heterozygous.',
      'Correct — two recessive alleles.',
      'Haploid gamete.'
    ]
  },
  {
    id: 'u7q5', unit: 'unit7', type: 'selectall', q: 'Which are examples of non-Mendelian inheritance?',
    choices: ['Incomplete dominance', 'Codominance', 'Sex-linked traits', 'Simple dominance'],
    answer: [0, 1, 2],
    explain: 'These patterns do not follow simple dominant/recessive rules.',
    explain_each: [
      'Correct — blending of traits.',
      'Correct — both traits expressed.',
      'Correct — on X/Y chromosomes.',
      'Incorrect — this is Mendelian.'
    ]
  },
  {
    id: 'u7q6', unit: 'unit7', type: 'multiple', q: 'In a heterozygous cross (Aa x Aa), what is the phenotypic ratio?',
    choices: ['1:1', '3:1', '1:2:1', '4:0'],
    answer: 1,
    explain: '3 dominant phenotype : 1 recessive phenotype.',
    explain_each: [
      'Ratio for test cross.',
      'Correct — 75% dominant, 25% recessive.',
      'Genotypic ratio.',
      'All dominant.'
    ]
  },
  {
    id: 'u7q7', unit: 'unit7', type: 'truefalse', q: 'Males are more likely to express X-linked recessive traits.',
    choices: ['True', 'False'],
    answer: 0,
    explain: 'Males have only one X chromosome (XY), so they express whatever is on it.',
    explain_each: [
      'Correct — no second X to mask it.',
      'Incorrect — females have XX backup.'
    ]
  },
  {
    id: 'u7q8', unit: 'unit7', type: 'multiple', q: 'What does a Punnett square predict?',
    choices: ['Exact offspring', 'Probability of offspring genotypes', 'Number of offspring', 'Mutations'],
    answer: 1,
    explain: 'It shows potential combinations and their likelihood.',
    explain_each: [
      'Cannot predict exact outcomes.',
      'Correct — statistical probability.',
      'Does not predict litter size.',
      'Does not predict mutations.'
    ]
  },
  {
    id: 'u7q9', unit: 'unit7', type: 'selectall', q: 'What is true about codominance?',
    choices: ['Both alleles are expressed', 'Traits blend together', 'Blood type AB is an example', 'One allele hides the other'],
    answer: [0, 2],
    explain: 'Codominance shows both traits fully (e.g., spots).',
    explain_each: [
      'Correct — distinct expression.',
      'Incorrect — that is incomplete dominance.',
      'Correct — A and B antigens both present.',
      'Incorrect — that is simple dominance.'
    ]
  },
  {
    id: 'u7q10', unit: 'unit7', type: 'multiple', q: 'What is the Law of Segregation?',
    choices: ['Alleles separate during gamete formation', 'Genes sort independently', 'Dominant masks recessive', 'DNA replicates once'],
    answer: 0,
    explain: 'Each gamete gets only one allele for a gene.',
    explain_each: [
      'Correct — Mendel\'s first law.',
      'Law of Independent Assortment.',
      'Principle of Dominance.',
      'Cell cycle fact.'
    ]
  },
  {
    id: 'u7q11', unit: 'unit7', type: 'truefalse', q: 'Phenotype refers to the genetic makeup of an organism.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Phenotype is the physical expression; genotype is the genetic makeup.',
    explain_each: [
      'Incorrect — that is genotype.',
      'Correct — phenotype is what you see.'
    ]
  },
  {
    id: 'u7q12', unit: 'unit7', type: 'multiple', q: 'Which blood type is the universal donor?',
    choices: ['Type A', 'Type B', 'Type AB', 'Type O'],
    answer: 3,
    explain: 'Type O negative has no antigens to trigger immune response.',
    explain_each: [
      'Has A antigens.',
      'Has B antigens.',
      'Universal recipient.',
      'Correct — no antigens.'
    ]
  },
  {
    id: 'u7q13', unit: 'unit7', type: 'selectall', q: 'Which are polygenic traits?',
    choices: ['Skin color', 'Height', 'Eye color', 'Cystic fibrosis'],
    answer: [0, 1, 2],
    explain: 'Polygenic traits are controlled by multiple genes.',
    explain_each: [
      'Correct — continuous variation.',
      'Correct — continuous variation.',
      'Correct — multiple genes involved.',
      'Incorrect — single gene disorder.'
    ]
  },
  {
    id: 'u7q14', unit: 'unit7', type: 'multiple', q: 'What is a carrier?',
    choices: ['Homozygous dominant', 'Heterozygous for a recessive disorder', 'Homozygous recessive', 'Infected individual'],
    answer: 1,
    explain: 'Carriers have the gene but do not express the disease.',
    explain_each: [
      'Does not carry recessive allele.',
      'Correct — Aa genotype.',
      'Expresses the disorder.',
      'Not necessarily infectious.'
    ]
  },
  {
    id: 'u7q15', unit: 'unit7', type: 'truefalse', q: 'Independent assortment produces genetic variation.',
    choices: ['True', 'False'],
    answer: 0,
    explain: 'Random distribution of homologous chromosomes creates new combinations.',
    explain_each: [
      'Correct — mixes maternal/paternal chromosomes.',
      'Incorrect — it is a key source of variation.'
    ]
  }
];

const unit8Questions = [
  {
    id: 'u8q1', unit: 'unit8', type: 'multiple', q: 'What is the mechanism of evolution proposed by Darwin?',
    choices: ['Artificial selection', 'Natural selection', 'Acquired characteristics', 'Genetic drift'],
    answer: 1,
    explain: 'Natural selection drives adaptation.',
    explain_each: [
      'Human-driven breeding.',
      'Correct — survival of the fittest.',
      'Lamarck\'s incorrect theory.',
      'Random chance.'
    ]
  },
  {
    id: 'u8q2', unit: 'unit8', type: 'multiple', q: 'What are homologous structures?',
    choices: ['Structures with same function but different origin', 'Structures with same origin but different function', 'Vestigial structures', 'Fossils'],
    answer: 1,
    explain: 'Homologous structures indicate common ancestry (e.g., bat wing and human arm).',
    explain_each: [
      'Analogous structures.',
      'Correct — divergent evolution.',
      'Reduced structures.',
      'Preserved remains.'
    ]
  },
  {
    id: 'u8q3', unit: 'unit8', type: 'truefalse', q: 'Evolution acts on individuals, not populations.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Individuals survive or die; populations evolve over time.',
    explain_each: [
      'Incorrect — individuals do not evolve.',
      'Correct — allele frequencies change in populations.'
    ]
  },
  {
    id: 'u8q4', unit: 'unit8', type: 'multiple', q: 'What is a vestigial structure?',
    choices: ['A structure with no current function', 'A necessary organ', 'A new adaptation', 'A fossil'],
    answer: 0,
    explain: 'Remnants of structures useful to ancestors (e.g., whale pelvis).',
    explain_each: [
      'Correct — reduced function.',
      'Functional organs are not vestigial.',
      'Adaptations are functional.',
      'Fossils are rock.'
    ]
  },
  {
    id: 'u8q5', unit: 'unit8', type: 'selectall', q: 'Which are evidences for evolution?',
    choices: ['Fossil record', 'DNA similarities', 'Embryology', 'Homologous structures'],
    answer: [0, 1, 2, 3],
    explain: 'Multiple lines of evidence support evolution.',
    explain_each: [
      'Correct — shows change over time.',
      'Correct — molecular evidence.',
      'Correct — developmental similarities.',
      'Correct — anatomical evidence.'
    ]
  },
  {
    id: 'u8q6', unit: 'unit8', type: 'multiple', q: 'What is genetic drift?',
    choices: ['Selection for best traits', 'Random change in allele frequency', 'Migration of individuals', 'Mutation'],
    answer: 1,
    explain: 'Genetic drift affects small populations by chance.',
    explain_each: [
      'Natural selection.',
      'Correct — e.g., bottleneck effect.',
      'Gene flow.',
      'Source of variation.'
    ]
  },
  {
    id: 'u8q7', unit: 'unit8', type: 'truefalse', q: 'Analogous structures share a common ancestor.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Analogous structures evolve independently for similar functions (convergent evolution).',
    explain_each: [
      'Incorrect — homologous structures do.',
      'Correct — e.g., bird wing and insect wing.'
    ]
  },
  {
    id: 'u8q8', unit: 'unit8', type: 'multiple', q: 'What is speciation?',
    choices: ['Extinction of a species', 'Formation of a new species', 'Migration', 'Competition'],
    answer: 1,
    explain: 'Speciation occurs when populations become reproductively isolated.',
    explain_each: [
      'Death of species.',
      'Correct — divergence.',
      'Movement.',
      'Interaction.'
    ]
  },
  {
    id: 'u8q9', unit: 'unit8', type: 'selectall', q: 'What conditions are required for natural selection?',
    choices: ['Variation', 'Overproduction of offspring', 'Heritability', 'Differential survival'],
    answer: [0, 1, 2, 3],
    explain: 'Darwin\'s postulates.',
    explain_each: [
      'Correct — differences must exist.',
      'Correct — competition for resources.',
      'Correct — traits must be passed down.',
      'Correct — fitness differences.'
    ]
  },
  {
    id: 'u8q10', unit: 'unit8', type: 'multiple', q: 'What is gene flow?',
    choices: ['Random change', 'Movement of alleles between populations', 'Selection', 'Mutation'],
    answer: 1,
    explain: 'Gene flow occurs via migration.',
    explain_each: [
      'Genetic drift.',
      'Correct — immigration/emigration.',
      'Natural selection.',
      'New alleles.'
    ]
  },
  {
    id: 'u8q11', unit: 'unit8', type: 'truefalse', q: 'Fitness refers to physical strength.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Fitness is the ability to survive and reproduce.',
    explain_each: [
      'Incorrect — it is reproductive success.',
      'Correct — not just strength.'
    ]
  },
  {
    id: 'u8q12', unit: 'unit8', type: 'multiple', q: 'Which isolation mechanism prevents mating due to timing?',
    choices: ['Geographic isolation', 'Temporal isolation', 'Behavioral isolation', 'Mechanical isolation'],
    answer: 1,
    explain: 'Temporal isolation involves different breeding seasons or times.',
    explain_each: [
      'Physical barrier.',
      'Correct — time difference.',
      'Different rituals.',
      'Incompatible anatomy.'
    ]
  },
  {
    id: 'u8q13', unit: 'unit8', type: 'selectall', q: 'Which are examples of artificial selection?',
    choices: ['Dog breeds', 'Antibiotic resistance', 'Corn varieties', 'Peppered moths'],
    answer: [0, 2],
    explain: 'Humans select traits in artificial selection.',
    explain_each: [
      'Correct — bred by humans.',
      'Incorrect — natural selection.',
      'Correct — agricultural breeding.',
      'Incorrect — natural selection.'
    ]
  },
  {
    id: 'u8q14', unit: 'unit8', type: 'multiple', q: 'What is the bottleneck effect?',
    choices: ['Population expansion', 'Drastic reduction in population size', 'Migration', 'Mutation'],
    answer: 1,
    explain: 'Bottlenecks reduce genetic diversity.',
    explain_each: [
      'Opposite.',
      'Correct — due to disaster.',
      'Gene flow.',
      'Change in DNA.'
    ]
  },
  {
    id: 'u8q15', unit: 'unit8', type: 'truefalse', q: 'Convergent evolution produces homologous structures.',
    choices: ['True', 'False'],
    answer: 1,
    explain: 'Convergent evolution produces analogous structures.',
    explain_each: [
      'Incorrect — it produces analogous structures.',
      'Correct — homologous come from divergent evolution.'
    ]
  }
];

const questions = [...unit1Questions, ...unit2Questions, ...unit3Questions, ...unit4Questions, ...unit5Questions, ...unit6Questions, ...unit7Questions, ...unit8Questions];

let currentIndex = 0; let score = 0; let total = 0;

const quizArea = document.getElementById('quiz-area');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const submitBtn = document.getElementById('submit-answer');
const nextBtn = document.getElementById('next-question');
const resetBtn = document.getElementById('reset-quiz');

let sessionQuestions = [];

function shuffleArray(a) {
    const arr = [...a];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function getSelectedUnits() {
    const checks = Array.from(document.querySelectorAll('#notes-tree .unit-checkbox'));
    if (checks.length === 0) {
        // If no checkboxes exist yet, return all available units
        const allUnits = Array.from(document.querySelectorAll('.unit[data-unit]'));
        return allUnits.map(u => u.dataset.unit);
    }
    const sel = checks.filter(c => c.checked).map(c => c.dataset.unit);
    // If no units are checked, return all units (this shouldn't happen but safety check)
    if (!sel || sel.length === 0) {
        const allUnits = Array.from(document.querySelectorAll('.unit[data-unit]'));
        return allUnits.map(u => u.dataset.unit);
    }
    return sel;
}

function buildSessionQuestions() {
    const selected = getSelectedUnits();
    // Create a fresh copy of all questions, not just pool
    let pool = questions.filter(q => { return !q.unit || selected.includes(q.unit); });
    
    // Check if there are any questions selected
    if (!pool || pool.length === 0) {
        sessionQuestions = [];
        currentIndex = 0;
        score = 0;
        total = 0;
        scoreEl.textContent = score;
        totalEl.textContent = total;
        quizArea.innerHTML = '<div class="small" style="text-align: center; padding: 2rem; color: var(--muted);">Please select at least one unit from the Notes tab to begin the quiz.</div>';
        submitBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }
    
    // Deep copy each question and shuffle its choices
    const mapped = pool.map(orig => {
        // Create a complete deep copy
        const q = {
            id: orig.id,
            unit: orig.unit,
            type: orig.type,
            q: orig.q,
            choices: [...orig.choices],
            answer: Array.isArray(orig.answer) ? [...orig.answer] : orig.answer,
            explain: orig.explain,
            explain_each: orig.explain_each ? [...orig.explain_each] : []
        };
        
        // Shuffle the choices for this copy
        const indices = Array.from({length: q.choices.length}, (_, i) => i);
        const shuffledIndices = shuffleArray(indices);
        
        const newChoices = shuffledIndices.map(i => q.choices[i]);
        const newExplainEach = shuffledIndices.map(i => q.explain_each[i] || '');
        
        // Update answer indices based on shuffle
        if (Array.isArray(q.answer)) {
            q.answer = q.answer.map(origIdx => shuffledIndices.indexOf(origIdx));
        } else {
            q.answer = shuffledIndices.indexOf(q.answer);
        }
        
        q.choices = newChoices;
        q.explain_each = newExplainEach;
        return q;
    });
    
    // Shuffle the question order too
    sessionQuestions = shuffleArray(mapped);
    currentIndex = 0;
    score = 0;
    total = 0;
    scoreEl.textContent = score;
    totalEl.textContent = total;
    renderQuestion(currentIndex);
}

function reshuffleQuestions() {
    if (!sessionQuestions || sessionQuestions.length === 0) return;
    sessionQuestions = sessionQuestions.map(orig => {
        const q = JSON.parse(JSON.stringify(orig));
        const idxs = q.choices.map((_, i) => i);
        shuffleArray(idxs);
        const newChoices = idxs.map(i => q.choices[i]);
        const newExplainEach = idxs.map(i => (q.explain_each && q.explain_each[i]) ? q.explain_each[i] : '');
        if (Array.isArray(q.answer)) {
            const newAns = q.answer.map(origIdx => idxs.findIndex(n => n === origIdx)).filter(v => v >= 0);
            q.answer = newAns;
        } else {
            q.answer = idxs.findIndex(n => n === q.answer);
        }
        q.choices = newChoices; q.explain_each = newExplainEach;
        return q;
    });
}

function renderQuestion(idx) {
    if (!sessionQuestions || sessionQuestions.length === 0) { quizArea.innerHTML = '<div class="small">No questions available for selected units. Use the Notes tab to select different units.</div>'; submitBtn.disabled = true; nextBtn.disabled = true; return; }
    let q = sessionQuestions[idx];
    // Create a fresh shuffled copy for display
    q = {
        id: q.id,
        unit: q.unit,
        type: q.type,
        q: q.q,
        choices: [...q.choices],
        answer: Array.isArray(q.answer) ? [...q.answer] : q.answer,
        explain: q.explain,
        explain_each: [...q.explain_each]
    };
    // Re-shuffle choices each time this question is displayed
    const indices = Array.from({length: q.choices.length}, (_, i) => i);
    const shuffledIndices = shuffleArray(indices);
    const newChoices = shuffledIndices.map(i => q.choices[i]);
    const newExplainEach = shuffledIndices.map(i => q.explain_each[i] || '');
    if (Array.isArray(q.answer)) {
        q.answer = q.answer.map(origIdx => shuffledIndices.indexOf(origIdx));
    } else {
        q.answer = shuffledIndices.indexOf(q.answer);
    }
    q.choices = newChoices;
    q.explain_each = newExplainEach;
    quizArea.innerHTML = '';
    const questionEl = document.createElement('div'); questionEl.className = 'question'; questionEl.innerHTML = `<strong>Q${idx + 1}.</strong> ${q.q}`;
    quizArea.appendChild(questionEl);
    const choices = document.createElement('div'); choices.className = 'choices';

    if (q.type === 'multiple' || q.type === 'truefalse') {
        q.choices.forEach((c, i) => {
            const ch = document.createElement('div'); ch.className = 'choice'; ch.tabIndex = 0; ch.dataset.index = i; ch.innerHTML = `<span>${c}</span>`;
            ch.onclick = () => { choices.querySelectorAll('.choice').forEach(x => x.classList.remove('selected')); ch.classList.add('selected'); };
            choices.appendChild(ch);
        });
    } else if (q.type === 'selectall') {
        q.choices.forEach((c, i) => {
            const ch = document.createElement('label'); ch.className = 'choice'; ch.style.display = 'flex'; ch.style.alignItems = 'center'; ch.style.justifyContent = 'space-between';
            const left = document.createElement('span'); left.style.display = 'flex'; left.style.alignItems = 'center';
            const cb = document.createElement('input'); cb.type = 'checkbox'; cb.style.marginRight = '0.6rem'; cb.dataset.index = i;
            left.appendChild(cb); left.appendChild(document.createTextNode(c));
            ch.appendChild(left);
            choices.appendChild(ch);
        });
    }
    quizArea.appendChild(choices);
    const explainEl = document.createElement('div'); explainEl.id = 'explain'; explainEl.style.marginTop = '0.6rem'; quizArea.appendChild(explainEl);
    submitBtn.disabled = false; nextBtn.disabled = true;
}

function arraysEqual(a, b) { if (a.length !== b.length) return false; a = [...a].sort(); b = [...b].sort(); return a.every((v, i) => v === b[i]); }

submitBtn.addEventListener('click', () => {
    const q = sessionQuestions[currentIndex];
    const choicesEl = quizArea.querySelector('.choices');
    if (!q) return;
    let correct = false;
    let userSelection = null;

    if (q.type === 'multiple' || q.type === 'truefalse') {
        const sel = choicesEl.querySelector('.choice.selected');
        if (!sel) { alert('Please select an answer'); return; }
        const idx = Number(sel.dataset.index); userSelection = idx;
        if (idx === q.answer) { correct = true; sel.classList.add('correct'); } else { sel.classList.add('wrong'); }
    } else if (q.type === 'selectall') {
        const checked = Array.from(choicesEl.querySelectorAll('input[type="checkbox"]')).filter(c => c.checked).map(c => Number(c.dataset.index));
        if (checked.length === 0) { alert('Select at least one option'); return; }
        userSelection = checked;
        if (arraysEqual(checked, q.answer)) { correct = true; checked.forEach(i => { const el = choicesEl.querySelector('[data-index="' + i + '"]').closest('.choice'); if (el) el.classList.add('correct'); }); }
        else { Array.from(choicesEl.querySelectorAll('input[type="checkbox"]')).forEach(c => { if (c.checked) { c.closest('.choice').classList.add('wrong'); } }); }
    }

    total += 1; if (correct) score += 1; scoreEl.textContent = score; totalEl.textContent = total;

    const explainEl = document.getElementById('explain'); explainEl.innerHTML = '';
    const list = document.createElement('div'); list.className = 'micro'; const ul = document.createElement('ul'); ul.style.paddingLeft = '1rem';
    q.choices.forEach((choice, i) => {
        const li = document.createElement('li'); li.style.marginBottom = '0.5rem';
        const prefix = (Array.isArray(userSelection) ? (userSelection.includes(i) ? 'Your selection — ' : '') : (userSelection === i ? 'Your selection — ' : ''));
        const correctness = ((Array.isArray(q.answer) ? q.answer.includes(i) : q.answer === i)) ? ' (correct)' : ' (incorrect)';
        li.innerHTML = `<strong>${prefix}${choice}</strong>${correctness}<div style="margin-top:0.25rem">${(q.explain_each && q.explain_each[i]) ? q.explain_each[i] : (i === q.answer ? q.explain : '')}</div>`;
        ul.appendChild(li);
    }); list.appendChild(ul); explainEl.appendChild(list);

    submitBtn.disabled = true; nextBtn.disabled = false;
});

nextBtn.addEventListener('click', () => {
    if (!sessionQuestions || sessionQuestions.length === 0) return;
    currentIndex = (currentIndex + 1) % sessionQuestions.length;
    renderQuestion(currentIndex);
});

resetBtn.addEventListener('click', () => {
    if (!confirm('Reset quiz score and progress?')) return;
    score = 0; total = 0; scoreEl.textContent = score; totalEl.textContent = total; currentIndex = 0; buildSessionQuestions();
});

buildUnitSelector();
// Force a fresh shuffle each page load with current timestamp
sessionQuestions = [];
currentIndex = 0;
score = 0;
total = 0;
buildSessionQuestions();

(function updateClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;
    function tick() {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes().toString().padStart(2, '0');
        const s = now.getSeconds().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        clockEl.textContent = `${h}:${m}:${s} ${ampm}`;
    }
    tick();
    setInterval(tick, 1000);
})();

(function initSidebar() {
    const openBtn = document.getElementById('open-sidebar-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    if (!openBtn || !overlay || !sidebar || !closeBtn) return;
    function showSidebar() { sidebar.classList.add('open'); overlay.classList.add('visible'); sidebar.setAttribute('aria-hidden', 'false'); }
    function hideSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('visible'); sidebar.setAttribute('aria-hidden', 'true'); }
    openBtn.addEventListener('click', showSidebar);
    closeBtn.addEventListener('click', hideSidebar);
    overlay.addEventListener('click', hideSidebar);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideSidebar(); });
    const sidebarItems = Array.from(document.querySelectorAll('.sidebar-item'));
    sidebarItems.forEach(item => { item.addEventListener('click', () => { const id = item.dataset.id; if (id) window.location.href = id + '.html'; }); });
})();