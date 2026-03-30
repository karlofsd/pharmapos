export const DCI_CATEGORIES = [
	"analgesico",
	"antiacido",
	"antianemico",
	"anestesico",
	"antiespasmodico",
	"antiemetico",
	"antiflatulento",
	"antimicotico",
	"antigripal",
	"antihistaminico",
	"antidiarreico",
	"anticonceptivo",
	"anticonvulsivo",
	"antiinflamatorio",
	"antipiretico",
	"antitrombotico",
	"antibacteriano",
	"antibiotico",
	"antivertiginoso",
	"ansiolitico",
	"antineuropatico",
	"antirreumatico",
	"antiparasitario",
	"antiviral",
	"asma",
	"betabloqueador",
	"broncodilatador",
	"calcioantagonista",
	"colesterol",
	"corticoide",
	"descongestionante",
	"digestivo",
	"diuretico",
	"estimulador",
	"expectorante",
	"flebotonico",
	"gastritis",
	"gastrocinetico",
	"hepatoprotector",
	"hipoglucemiante",
	"hormonal",
	"inmunomodulador",
	"laxante",
	"mucolitico",
	"nasal",
	"oftalmica",
	"otica",
	"pediculicida",
	"presion",
	"probiotico",
	"purgante",
	"relajante muscular",
	"suplemento",
	"suero rehidratante",
	"suero fisiologico",
	"suero vitaminico",
	"tiroides",
	"topico",
	"urologico",
	"vasodilatador",
	"vasoprotector",
	"other"
] as const

export const DCI_DATA: { name: string; categories: string[] }[] = [
	{ name: "aciclovir", categories: ["antiviral"] },
	{ name: "acetilcisteina", categories: ["mucolitico", "expectorante"] },
	{
		name: "acido acetilsalicilico",
		categories: ["analgesico", "antipiretico", "antitrombotico", "antiinflamatorio"]
	},
	{ name: "acido clavulanico", categories: ["antibiotico"] },
	{ name: "algestona", categories: ["anticonceptivo", "hormonal"] },
	{ name: "ambroxol", categories: ["mucolitico", "expectorante"] },
	{ name: "amoxicilina", categories: ["antibiotico"] },
	{ name: "atorvastatina", categories: ["colesterol"] },
	{ name: "azitromicina", categories: ["antibiotico"] },
	{ name: "bacillus clausii", categories: ["probiotico", "inmunomodulador"] },
	{ name: "bencidamina", categories: ["analgesico", "antiinflamatorio"] },
	{ name: "betametasona", categories: ["corticoide", "antiinflamatorio"] },
	{ name: "bicarbonato sodio", categories: ["antiacido"] },
	{ name: "bisacodilo", categories: ["laxante", "purgante"] },
	{ name: "bisoprolol", categories: ["betabloqueador", "presion"] },
	{ name: "bromhexina", categories: ["mucolitico", "expectorante"] },
	{ name: "bromuro pinaverio", categories: ["antiespasmodico"] },
	{ name: "bromoprida", categories: ["gastrocinetico", "antiemetico"] },
	{ name: "cafeina", categories: ["analgesico", "estimulador"] },
	{ name: "calcio", categories: ["suplemento"] },
	{ name: "carvedilol", categories: ["betabloqueador", "presion"] },
	{ name: "cartilago tiburon", categories: ["suplemento", "antiinflamatorio"] },
	{ name: "cefalexina", categories: ["antibiotico"] },
	{ name: "celecoxib", categories: ["antiinflamatorio", "analgesico", "antirreumatico"] },
	{ name: "ceftriaxona", categories: ["antibiotico"] },
	{ name: "cetirizina", categories: ["antihistaminico"] },
	{ name: "cianocobalamina", categories: ["suplemento", "antianemico"] },
	{ name: "ciprofloxacino", categories: ["antibiotico"] },
	{ name: "cipionato estradiol", categories: ["anticonceptivo", "hormonal"] },
	{ name: "clenbuterol", categories: ["asma", "broncodilatador"] },
	{ name: "clindamicina", categories: ["antibiotico"] },
	{ name: "clobetasol", categories: ["corticoide", "antiinflamatorio"] },
	{ name: "clonazepam", categories: ["ansiolitico", "anticonvulsivo"] },
	{ name: "clorhidrato papaverina", categories: ["antiespasmodico"] },
	{ name: "clorfenamina", categories: ["antihistaminico", "antigripal"] },
	{ name: "cloruro sodio", categories: ["suero fisiologico"] },
	{ name: "clotrimazol", categories: ["antimicotico"] },
	{ name: "colageno hidrolizado", categories: ["suplemento"] },
	{ name: "dexametasona", categories: ["corticoide", "antiinflamatorio"] },
	{ name: "desloratadina", categories: ["antihistaminico"] },
	{ name: "dextrometorfano", categories: ["antigripal"] },
	{ name: "diclofenaco", categories: ["antiinflamatorio", "analgesico", "antirreumatico"] },
	{ name: "dimenhidrinato", categories: ["antiemetico", "antivertiginoso"] },
	{ name: "dobesilato calcio", categories: ["flebotonico", "vasoprotector"] },
	{ name: "doxiciclina", categories: ["antibiotico"] },
	{ name: "enzima digestiva", categories: ["digestivo"] },
	{ name: "escopolamina", categories: ["antiespasmodico"] },
	{ name: "esomeprazol", categories: ["gastritis"] },
	{ name: "espironolactona", categories: ["diuretico", "presion"] },
	{ name: "etoricoxib", categories: ["antiinflamatorio", "analgesico", "antirreumatico"] },
	{ name: "fenazopiridina", categories: ["analgesico", "urologico"] },
	{ name: "fenilefrina", categories: ["descongestionante", "antigripal"] },
	{ name: "fexofenadina", categories: ["antihistaminico"] },
	{ name: "framicetina", categories: ["antibiotico", "oftalmica"] },
	{ name: "gentamicina", categories: ["antibiotico"] },
	{ name: "ginseng", categories: ["suplemento", "estimulador"] },
	{ name: "glucosa", categories: ["suero rehidratante"] },
	{ name: "hedera helix", categories: ["expectorante", "mucolitico"] },
	{ name: "hierro sucrosa", categories: ["antianemico", "suplemento"] },
	{ name: "hioscina", categories: ["antiespasmodico"] },
	{ name: "hipromelosa", categories: ["oftalmica"] },
	{ name: "hidroxido aluminio", categories: ["antiacido"] },
	{ name: "hidroxido magnesio", categories: ["antiacido", "laxante"] },
	{ name: "hidroxocobalamina", categories: ["suplemento", "antianemico"] },
	{ name: "hmb", categories: ["suplemento"] },
	{ name: "ibuprofeno", categories: ["antiinflamatorio", "analgesico", "antipiretico"] },
	{ name: "irbesartan", categories: ["presion"] },
	{ name: "jengibre", categories: ["antigripal", "digestivo"] },
	{ name: "ketorolaco", categories: ["analgesico", "antiinflamatorio"] },
	{ name: "lactobacillus sporogenes", categories: ["probiotico"] },
	{ name: "levocetirizina", categories: ["antihistaminico"] },
	{ name: "levonorgestrel", categories: ["anticonceptivo"] },
	{ name: "levotiroxina", categories: ["tiroides", "hormonal"] },
	{ name: "lidocaina", categories: ["anestesico"] },
	{ name: "lincomicina", categories: ["antibiotico"] },
	{ name: "loperamida", categories: ["antidiarreico"] },
	{ name: "losartan", categories: ["presion"] },
	{ name: "magaldrato", categories: ["antiacido"] },
	{ name: "magnesio", categories: ["suplemento"] },
	{ name: "medroxiprogesterona", categories: ["anticonceptivo", "hormonal"] },
	{ name: "menta", categories: ["digestivo", "antigripal"] },
	{ name: "meropenem", categories: ["antibiotico"] },
	{ name: "metamizol", categories: ["analgesico", "antipiretico", "antiespasmodico"] },
	{ name: "metoclopramida", categories: ["gastrocinetico", "antiemetico"] },
	{ name: "metronidazol", categories: ["antibiotico", "antimicotico", "antiparasitario"] },
	{ name: "minoxidil", categories: ["vasodilatador"] },
	{ name: "misoprostol", categories: ["gastritis"] },
	{ name: "mupirocina", categories: ["antibacteriano"] },
	{ name: "nafazolina", categories: ["nasal", "oftalmica"] },
	{ name: "naproxeno", categories: ["antiinflamatorio", "analgesico", "antirreumatico"] },
	{ name: "nifuroxazida", categories: ["antidiarreico", "antibacteriano"] },
	{ name: "nitazoxanida", categories: ["antidiarreico", "antibacteriano", "antiparasitario"] },
	{ name: "nitrofurantoina", categories: ["antibiotico"] },
	{ name: "nistatina", categories: ["antimicotico"] },
	{ name: "omeprazol", categories: ["gastritis"] },
	{ name: "orfenadrina", categories: ["relajante muscular", "analgesico"] },
	{ name: "oxetacaina", categories: ["anestesico", "antiacido"] },
	{ name: "oxitetraciclina", categories: ["antibiotico", "oftalmica"] },
	{ name: "pantoprazol", categories: ["gastritis"] },
	{ name: "paracetamol", categories: ["analgesico", "antipiretico"] },
	{ name: "permetrina", categories: ["pediculicida"] },
	{ name: "picosulfato sodio", categories: ["laxante", "purgante"] },
	{ name: "piridoxina", categories: ["suplemento"] },
	{ name: "polimixina b", categories: ["antibiotico", "oftalmica"] },
	{ name: "potasio", categories: ["suplemento"] },
	{ name: "pregabalina", categories: ["antineuropatico", "ansiolitico", "anticonvulsivo"] },
	{ name: "promestrieno", categories: ["hormonal"] },
	{ name: "pseudoefedrina", categories: ["descongestionante", "antigripal"] },
	{ name: "psyllium husk", categories: ["laxante"] },
	{ name: "ruscus aculeatus", categories: ["flebotonico", "vasoprotector"] },
	{ name: "salbutamol", categories: ["asma", "broncodilatador"] },
	{ name: "sertralina", categories: ["ansiolitico"] },
	{ name: "sildenafilo", categories: ["vasodilatador"] },
	{ name: "silimarina", categories: ["hepatoprotector"] },
	{ name: "simeticona", categories: ["antiflatulento"] },
	{ name: "sodio", categories: ["suero rehidratante"] },
	{ name: "subsalicilato bismuto", categories: ["antidiarreico", "antiacido"] },
	{ name: "tadalafilo", categories: ["vasodilatador"] },
	{ name: "tamsulosina", categories: ["urologico"] },
	{ name: "terbinafina", categories: ["antimicotico"] },
	{ name: "tetrahidrozolina", categories: ["oftalmica", "nasal"] },
	{ name: "tetrizolina", categories: ["oftalmica"] },
	{ name: "tiamina", categories: ["suplemento"] },
	{ name: "undecilato estradiol", categories: ["anticonceptivo", "hormonal"] },
	{ name: "vitamina b12", categories: ["suplemento", "antianemico"] },
	{ name: "vitamina c", categories: ["suplemento"] },
	{ name: "vitamina d", categories: ["suplemento"] },
	{ name: "vitamina e", categories: ["suplemento"] },
	{ name: "vitaminas", categories: ["suplemento"] },
	{ name: "zinc", categories: ["suplemento"] }
] as const

export const LABS = [
	"Abbott",
	"AC Farma",
	"Accord",
	"Ajrlabs",
	"Alkofarma",
	"Ansolat",
	"Avanx Lab",
	"Axier Group",
	"Bago",
	"Bayer",
	"BHC Biotech",
	"Bonapharm",
	"Caferma",
	"Carnot",
	"Cienpharma",
	"Cifarma",
	"Corporacion FS",
	"CSP",
	"Daewon",
	"Dany",
	"Daxolab",
	"Deutsche Pharma",
	"Diphasac",
	"Dropesac",
	"Eurofarma",
	"Falab Peru",
	"Farmindustria",
	"Farvet",
	"Fresenius Kabi",
	"Garden House",
	"Genfar",
	"Generion Pharma",
	"Genomma Lab",
	"Good Brands",
	"GSK",
	"Haleon",
	"Hersil",
	"Indufarm",
	"Intipharma",
	"Iqfarma",
	"JCM & MF",
	"Labo Gen",
	"Laboratorios Delfarma",
	"Labot",
	"Labsuperfood",
	"Lansier",
	"Lusa",
	"Lyafarm",
	"M&F",
	"Marfan",
	"Markos",
	"Medifarma",
	"Medrock",
	"Megalabs",
	"Millet",
	"Nutri Innova",
	"P&G",
	"Pharma Genericos",
	"Pharmed Corporation",
	"Portugal",
	"Procaps",
	"Quilab",
	"Roxfarma",
	"Sanfer",
	"Sanofi",
	"Sebalfarma",
	"Seven Pharma",
	"Sherfarma",
	"Sun Pharma",
	"Swiss",
	"Teva",
	"Thefar",
	"Tobal",
	"Vitalis",
	"Vitaline"
] as const

export const PRODUCTS = [
	{
		brand: "NOPUCID 10",
		manufacturer: "Abbot",
		barcode: "7750304005845",
		altcode: [],
		dci: [
			{
				dciId: "p4hWY05hHdn0fxF8LjeC",
				name: "permetrina",
				measurement: 10.0,
				unit: "mg",
				categories: ["pediculicida"]
			}
		],
		presentation: "powder",
		categories: ["pediculicida"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICETEL",
		manufacturer: "Abbot",
		barcode: "7501033961649",
		altcode: [],
		dci: [
			{
				dciId: "bRTXsxltFL2bPyrYqsvM",
				name: "bromuro pinaverio",
				measurement: 100.0,
				unit: "mg",
				categories: ["antiespasmodico"]
			}
		],
		presentation: "tablet",
		categories: ["antiespasmodico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SERTRALINA",
		manufacturer: "Ac Farma",
		barcode: "7750936001963",
		altcode: [],
		dci: [
			{
				dciId: "CIxWW2EtLkHdyszhhQ8m",
				name: "sertralina",
				measurement: 50.0,
				unit: "mg",
				categories: ["ansiolitico"]
			}
		],
		presentation: "tablet",
		categories: ["ansiolitico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: true
	},
	{
		brand: "PIRIDOXINA",
		manufacturer: "Ac Farma",
		barcode: "7750936431746",
		altcode: [],
		dci: [
			{
				dciId: "MzDoli6CvMArEyfd91Vm",
				name: "piridoxina",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "tablet",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "OMEPRAZOL",
		manufacturer: "Ac Farma",
		barcode: "7750936000836",
		altcode: [],
		dci: [
			{
				dciId: "9P8pX93iea6ptDb69Cbe",
				name: "omeprazol",
				measurement: 20.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "tablet",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MELOXICAM",
		manufacturer: "Ac Farma",
		barcode: "7750936001437",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 15.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "tablet",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MUPIROCINA 2%",
		manufacturer: "Ac Farma",
		barcode: "7750936013201",
		altcode: [],
		dci: [
			{
				dciId: "woeRd3NRzVQuW5PI5OHJ",
				name: "mupirocina",
				measurement: 2.0,
				unit: "mg",
				categories: ["antibacteriano"]
			}
		],
		presentation: "cream",
		categories: ["antibacteriano"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LOSARTAN",
		manufacturer: "Ac Farma",
		barcode: "7750936014543",
		altcode: [],
		dci: [
			{
				dciId: "VYOc91MkNCzyDEV2HiwX",
				name: "losartan",
				measurement: 50.0,
				unit: "mg",
				categories: ["presion"]
			}
		],
		presentation: "tablet",
		categories: ["presion"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LEVOTIROXINA SODICA",
		manufacturer: "Ac Farma",
		barcode: "7750936013683",
		altcode: [],
		dci: [
			{
				dciId: "tVk65g0xZVP7U2ovSmax",
				name: "levotiroxina",
				measurement: 100.0,
				unit: "mg",
				categories: ["tiroides", "hormonal"]
			}
		],
		presentation: "tablet",
		categories: ["tiroides", "hormonal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "IRBESARTAN",
		manufacturer: "Ac Farma",
		barcode: "7750936014741",
		altcode: [],
		dci: [
			{
				dciId: "oWsIOZLjrTmW4P1Tijxs",
				name: "irbesartan",
				measurement: 150.0,
				unit: "mg",
				categories: ["presion"]
			}
		],
		presentation: "tablet",
		categories: ["presion"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "IRBESARTAN",
		manufacturer: "Ac Farma",
		barcode: "7750936002281",
		altcode: [],
		dci: [
			{
				dciId: "oWsIOZLjrTmW4P1Tijxs",
				name: "irbesartan",
				measurement: 150.0,
				unit: "mg",
				categories: ["presion"]
			}
		],
		presentation: "tablet",
		categories: ["presion"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ESPIRONOLACTONA",
		manufacturer: "Ac Farma",
		barcode: "7750936013461",
		altcode: [],
		dci: [
			{
				dciId: "NpuwF404PZvQd6LK991C",
				name: "espironolactona",
				measurement: 100.0,
				unit: "mg",
				categories: ["diuretico", "presion"]
			}
		],
		presentation: "tablet",
		categories: ["diuretico", "presion"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOBESILATO DE CALCIO",
		manufacturer: "Ac Farma",
		barcode: "7750936012457",
		altcode: [],
		dci: [
			{
				dciId: "LfrcJBDNKzAb3i2oUErO",
				name: "calcio",
				measurement: 500.0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "capsule",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLOTRIMAZOL 1%",
		manufacturer: "Ac Farma",
		barcode: "7750936012853",
		altcode: [],
		dci: [
			{
				dciId: "dL9eusuTYiBvX1ADXeBQ",
				name: "clotrimazol",
				measurement: 1.0,
				unit: "mg",
				categories: ["antimicotico"]
			}
		],
		presentation: "cream",
		categories: ["antimicotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLONAZEPAN",
		manufacturer: "Ac Farma",
		barcode: "7750936718304",
		altcode: [],
		dci: [
			{
				dciId: "fFikuIZwmPpJsbs9Iccp",
				name: "clonazepam",
				measurement: 2.0,
				unit: "mg",
				categories: ["ansiolitico", "anticonvulsivo"]
			}
		],
		presentation: "tablet",
		categories: ["ansiolitico", "anticonvulsivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: true
	},
	{
		brand: "CLONAZEPAN",
		manufacturer: "Ac Farma",
		barcode: "7750936003349",
		altcode: [],
		dci: [
			{
				dciId: "fFikuIZwmPpJsbs9Iccp",
				name: "clonazepam",
				measurement: 0.5,
				unit: "mg",
				categories: ["ansiolitico", "anticonvulsivo"]
			}
		],
		presentation: "tablet",
		categories: ["ansiolitico", "anticonvulsivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: true
	},
	{
		brand: "CLOBETASOL 0,05%",
		manufacturer: "Ac Farma",
		barcode: "7750936745393",
		altcode: [],
		dci: [
			{
				dciId: "dlG4DovUwxbfxrZLweu1",
				name: "clobetasol",
				measurement: 0.05,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "cream",
		categories: ["corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CEFALEXINA",
		manufacturer: "Ac Farma",
		barcode: "7750936007873",
		altcode: [],
		dci: [
			{
				dciId: "FCXzFS36qzy3tkq97bHh",
				name: "cefalexina",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CEFALEXINA",
		manufacturer: "Ac Farma",
		barcode: "7750936007873",
		altcode: [],
		dci: [
			{
				dciId: "FCXzFS36qzy3tkq97bHh",
				name: "cefalexina",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BETAMETASONA 0,05%",
		manufacturer: "Ac Farma",
		barcode: "7750936012846",
		altcode: [],
		dci: [
			{
				dciId: "zQpfrpNBtJGg5mYHI0ro",
				name: "betametasona",
				measurement: 0.05,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "cream",
		categories: ["corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AZITROMICINA",
		manufacturer: "Ac Farma",
		barcode: "7750936003288",
		altcode: [],
		dci: [
			{
				dciId: "DUKZh08nujtm5AAakXaR",
				name: "azitromicina",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AZITROMICINA",
		manufacturer: "Ac Farma",
		barcode: "7750936003288",
		altcode: [],
		dci: [
			{
				dciId: "DUKZh08nujtm5AAakXaR",
				name: "azitromicina",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ATORVASTATINA",
		manufacturer: "Ac Farma",
		barcode: "7750936011313",
		altcode: [],
		dci: [
			{
				dciId: "ZPctdanic5khtzCAIvka",
				name: "atorvastatina",
				measurement: 40.0,
				unit: "mg",
				categories: ["colesterol"]
			}
		],
		presentation: "tablet",
		categories: ["colesterol"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ATORVASTATINA",
		manufacturer: "Ac Farma",
		barcode: "7750936011306",
		altcode: [],
		dci: [
			{
				dciId: "ZPctdanic5khtzCAIvka",
				name: "atorvastatina",
				measurement: 40.0,
				unit: "mg",
				categories: ["colesterol"]
			}
		],
		presentation: "tablet",
		categories: ["colesterol"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ACICLOVIR",
		manufacturer: "Ac Farma",
		barcode: "7750936012655",
		altcode: [],
		dci: [
			{
				dciId: "51A54IR38iXs0yhGffVz",
				name: "aciclovir",
				measurement: 800.0,
				unit: "mg",
				categories: ["antiviral"]
			}
		],
		presentation: "tablet",
		categories: ["antiviral"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PRECORD",
		manufacturer: "Accord",
		barcode: "7754477001161",
		altcode: [],
		dci: [
			{
				dciId: "mKCZLqcXZQPOWhCJRvg9",
				name: "pregabalina",
				measurement: 150.0,
				unit: "mg",
				categories: ["antineuropatico", "ansiolitico", "anticonvulsivo"]
			}
		],
		presentation: "capsule",
		categories: ["antineuropatico", "ansiolitico", "anticonvulsivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CAMAPION 2O",
		manufacturer: "Accord",
		barcode: "7754477001567",
		altcode: [],
		dci: [
			{
				dciId: "R66wc2HCHJaiMr7u3JiZ",
				name: "tadalafilo",
				measurement: 20.0,
				unit: "mg",
				categories: ["vasodilatador"]
			}
		],
		presentation: "tablet",
		categories: ["vasodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ETEROCOXX 120",
		manufacturer: "Ajrlabs",
		barcode: "7750489240000",
		altcode: [],
		dci: [
			{
				dciId: "emvDdGQ7XQUkCjKi3EqL",
				name: "etoricoxib",
				measurement: 120.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "tablet",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TILO EN FLORES",
		manufacturer: "Alkofarma",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "bLmDpOSR1sgFdESUKezV",
				name: "jengibre",
				measurement: 2.0,
				unit: "g",
				categories: ["antigripal", "digestivo"]
			}
		],
		presentation: "powder",
		categories: ["antigripal", "digestivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOLOCORDRALAN EXTRA FORTE NF",
		manufacturer: "Ansolat",
		barcode: "7759050000722",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			},
			{
				dciId: "4PME6zquptIa0F1d2SVL",
				name: "tiamina",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "MzDoli6CvMArEyfd91Vm",
				name: "piridoxina",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "rzJ9U647q8FYNZxLb0wt",
				name: "cianocobalamina",
				measurement: 0.25,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "capsule",
		categories: [
			"antiinflamatorio",
			"analgesico",
			"antirreumatico",
			"suplemento",
			"antianemico"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BRONCO VELAMOX NF",
		manufacturer: "Ansolat",
		barcode: "7759050000777",
		altcode: [],
		dci: [
			{
				dciId: "Ko1vfYHpJL7x0yrhrc2m",
				name: "amoxicilina",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico"]
			},
			{
				dciId: "nwZZ6Oq9MeS6lICLkYyt",
				name: "bromhexina",
				measurement: 8.0,
				unit: "mg",
				categories: ["mucolitico", "expectorante"]
			}
		],
		presentation: "capsule",
		categories: ["antibiotico", "mucolitico", "expectorante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ANAFLEX MUJER",
		manufacturer: "Bago",
		barcode: "7751495001746",
		altcode: [],
		dci: [
			{
				dciId: "VIWeU9GfL4D1AmYXOTdQ",
				name: "ibuprofeno",
				measurement: 200.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antipiretico"]
			}
		],
		presentation: "capsule",
		categories: ["antiinflamatorio", "analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CAFIASPIRINA FORTE",
		manufacturer: "Bayer",
		barcode: "7753954002981",
		altcode: [],
		dci: [
			{
				dciId: "yb0pXftPfgUHgoQ2ZRpo",
				name: "acido acetilsalicilico",
				measurement: 650.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico", "antitrombotico", "antiinflamatorio"]
			},
			{
				dciId: "POr4z4DdPpKilPOibID6",
				name: "cafeina",
				measurement: 65.0,
				unit: "mg",
				categories: ["analgesico", "estimulador"]
			}
		],
		presentation: "tablet",
		categories: [
			"analgesico",
			"antipiretico",
			"antitrombotico",
			"antiinflamatorio",
			"estimulador"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BRONQUIO FLEMITOSS",
		manufacturer: "Bhc Biotech",
		barcode: "8906141301957",
		altcode: [],
		dci: [
			{
				dciId: "Vz7fHWweD5g7jCLN9erS",
				name: "hedera helix",
				measurement: 35.0,
				unit: "mg",
				categories: ["expectorante", "mucolitico"]
			}
		],
		presentation: "syrup",
		categories: ["expectorante", "mucolitico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GRIPACHECK",
		manufacturer: "Bonapharm",
		barcode: "8904324900614",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 325.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "QUgfb8goNWTNUepiUHTu",
				name: "dextrometorfano",
				measurement: 10.0,
				unit: "mg",
				categories: ["antigripal"]
			},
			{
				dciId: "muKCfp6ceRKxvyLijUIT",
				name: "fenilefrina",
				measurement: 5.0,
				unit: "mg",
				categories: ["descongestionante", "antigripal"]
			}
		],
		presentation: "capsule",
		categories: ["analgesico", "antipiretico", "antigripal", "descongestionante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BONCHECK",
		manufacturer: "Bonapharm",
		barcode: "8904180900438",
		altcode: [],
		dci: [
			{
				dciId: "tVk65g0xZVP7U2ovSmax",
				name: "levotiroxina",
				measurement: 100.0,
				unit: "mg",
				categories: ["tiroides", "hormonal"]
			}
		],
		presentation: "tablet",
		categories: ["tiroides", "hormonal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CEFTRIZOL",
		manufacturer: "Caferma",
		barcode: "7751299000020",
		altcode: [],
		dci: [
			{
				dciId: "gAaSpB7f6M7XkY1pXccj",
				name: "ceftriaxona",
				measurement: 1.0,
				unit: "g",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CAFAZOLBAC",
		manufacturer: "Caferma",
		barcode: "7751299001645",
		altcode: [],
		dci: [
			{
				dciId: "gAaSpB7f6M7XkY1pXccj",
				name: "ceftriaxona",
				measurement: 1.0,
				unit: "g",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MENSILLE",
		manufacturer: "Carnot",
		barcode: "7501124181789",
		altcode: [],
		dci: [
			{
				dciId: "bRnaxeBtE5PR1xzgWcm3",
				name: "medroxiprogesterona",
				measurement: 25.0,
				unit: "mg",
				categories: ["anticonceptivo", "hormonal"]
			},
			{
				dciId: "SrCjFl7gLcz4dVnTx4Rv",
				name: "cipionato estradiol",
				measurement: 5.0,
				unit: "mg",
				categories: ["anticonceptivo", "hormonal"]
			}
		],
		presentation: "injection",
		categories: ["anticonceptivo", "hormonal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "OTOZAMBON NF",
		manufacturer: "Cifarma",
		barcode: "7751333000733",
		altcode: [],
		dci: [
			{
				dciId: "e3MXf7dnjHW7C1Vmul1A",
				name: "cloruro sodio",
				measurement: 0,
				unit: "ml",
				categories: ["suero fisiologico"]
			}
		],
		presentation: "syrup",
		categories: ["suero fisiologico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOLO NEUROBION FORTE NF",
		manufacturer: "Cifarma",
		barcode: "7500435249126",
		altcode: [],
		dci: [
			{
				dciId: "4PME6zquptIa0F1d2SVL",
				name: "tiamina",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			},
			{
				dciId: "MzDoli6CvMArEyfd91Vm",
				name: "piridoxina",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "rzJ9U647q8FYNZxLb0wt",
				name: "cianocobalamina",
				measurement: 0.25,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "capsule",
		categories: [
			"suplemento",
			"antiinflamatorio",
			"analgesico",
			"antirreumatico",
			"antianemico"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "OMEPRAZOL",
		manufacturer: "Corporacion Fs",
		barcode: "7750453600007",
		altcode: [],
		dci: [
			{
				dciId: "9P8pX93iea6ptDb69Cbe",
				name: "omeprazol",
				measurement: 40.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "injection",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PANTOZEX",
		manufacturer: "Csp",
		barcode: "8908005157267",
		altcode: [],
		dci: [
			{
				dciId: "m8SJShGSnq9kKRvTyt7E",
				name: "pantoprazol",
				measurement: 40.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "tablet",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "3-GEL",
		manufacturer: "Daewon",
		barcode: "8806718031938",
		altcode: [],
		dci: [
			{
				dciId: "rvcWYc2kQOCLt1IIlamC",
				name: "hidroxido aluminio",
				measurement: 582.0,
				unit: "mg",
				categories: ["antiacido"]
			},
			{
				dciId: "63ujuoIHAMa5BcOEVOVh",
				name: "magnesio",
				measurement: 196.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "swRtaS03JZ43hjUZ65Yh",
				name: "oxetacaina",
				measurement: 20.0,
				unit: "mg",
				categories: ["anestesico", "antiacido"]
			}
		],
		presentation: "powder",
		categories: ["antiacido", "suplemento", "anestesico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "METOCLONYL",
		manufacturer: "Dany",
		barcode: "7750500001047",
		altcode: [],
		dci: [
			{
				dciId: "zonxnMUEKBahPdH4zb9A",
				name: "metoclopramida",
				measurement: 10.0,
				unit: "mg",
				categories: ["gastrocinetico", "antiemetico"]
			}
		],
		presentation: "injection",
		categories: ["gastrocinetico", "antiemetico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DEXCORTIL",
		manufacturer: "Dany",
		barcode: "7750500001658",
		altcode: [],
		dci: [
			{
				dciId: "4dSUIiPnJJe8ulOWNzcK",
				name: "dexametasona",
				measurement: 4.0,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "injection",
		categories: ["corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "N-BUTILBROMURO DE HIOSCINA 20MG/ML",
		manufacturer: "Dany",
		barcode: "7750500000941",
		altcode: [],
		dci: [
			{
				dciId: "tpIZHhmXbB8kgq5X2WQI",
				name: "hioscina",
				measurement: 20.0,
				unit: "mg",
				categories: ["antiespasmodico"]
			}
		],
		presentation: "injection",
		categories: ["antiespasmodico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DIMENHIDRINATO 50MG/5ML",
		manufacturer: "Dany",
		barcode: "7750500000378",
		altcode: [],
		dci: [
			{
				dciId: "loyOtWOf8u0mUzKwr0dj",
				name: "dimenhidrinato",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiemetico", "antivertiginoso"]
			}
		],
		presentation: "injection",
		categories: ["antiemetico", "antivertiginoso"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CEFTRIAXONA 1G",
		manufacturer: "Dany",
		barcode: "7750500001078",
		altcode: [],
		dci: [
			{
				dciId: "gAaSpB7f6M7XkY1pXccj",
				name: "ceftriaxona",
				measurement: 1.0,
				unit: "g",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ORFLEXDAN",
		manufacturer: "Dany",
		barcode: "7753803000274",
		altcode: [],
		dci: [
			{
				dciId: "QpmtNz4EVlj6P4qtr7eN",
				name: "orfenadrina",
				measurement: 60.0,
				unit: "mg",
				categories: ["relajante muscular", "analgesico"]
			}
		],
		presentation: "injection",
		categories: ["relajante muscular", "analgesico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CELEDAXIB",
		manufacturer: "Daxolab",
		barcode: "0701822701631",
		altcode: [],
		dci: [
			{
				dciId: "ckXKvZe6Xy8yhvmw77zy",
				name: "celecoxib",
				measurement: 200.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "capsule",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HIRUDOID",
		manufacturer: "Deutsche Pharma",
		barcode: "7751940000287",
		altcode: [],
		dci: [
			{
				dciId: "sOnxutqt0nSfqTcwEEBa",
				name: "dobesilato calcio",
				measurement: 0.3,
				unit: "mg",
				categories: ["flebotonico", "vasoprotector"]
			}
		],
		presentation: "ointment",
		categories: ["flebotonico", "vasoprotector"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GRIPAMAXX",
		manufacturer: "Diphasac",
		barcode: "8904172928709",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 325.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "QUgfb8goNWTNUepiUHTu",
				name: "dextrometorfano",
				measurement: 10.0,
				unit: "mg",
				categories: ["antigripal"]
			},
			{
				dciId: "muKCfp6ceRKxvyLijUIT",
				name: "fenilefrina",
				measurement: 5.0,
				unit: "mg",
				categories: ["descongestionante", "antigripal"]
			}
		],
		presentation: "capsule",
		categories: ["analgesico", "antipiretico", "antigripal", "descongestionante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DIPHANATUR FORTE",
		manufacturer: "Diphasac",
		barcode: "8906141301810",
		altcode: [],
		dci: [
			{
				dciId: "roy32AbwyVJRe2wSRL1G",
				name: "silimarina",
				measurement: 150.0,
				unit: "mg",
				categories: ["hepatoprotector"]
			},
			{
				dciId: "annZAxNbWZaOGgEJoFZK",
				name: "vitaminas",
				measurement: 0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "capsule",
		categories: ["hepatoprotector", "suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "VITAMINA E",
		manufacturer: "Diphasac",
		barcode: "8904172928884",
		altcode: [],
		dci: [
			{
				dciId: "YIEAmxsnfT6w1AAFrMWn",
				name: "vitamina e",
				measurement: 400.0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "capsule",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICLOFENACO SODICO",
		manufacturer: "Diphasac",
		barcode: "6974499190358",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 75.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "injection",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICLOFENACO SODICO",
		manufacturer: "Diphasac",
		barcode: "6974499190358",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 75.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "injection",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GINOFURAN XR",
		manufacturer: "Dropesac",
		barcode: "7754102001214",
		altcode: [],
		dci: [
			{
				dciId: "k3mIScimoJbQMEKsKpCq",
				name: "nitrofurantoina",
				measurement: 100.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "capsule",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FERROVITON-S",
		manufacturer: "Dropesac",
		barcode: "7754102001054",
		altcode: [],
		dci: [
			{
				dciId: "U896iDwG8mZxOgHVdAal",
				name: "hierro sucrosa",
				measurement: 100.0,
				unit: "mg",
				categories: ["antianemico", "suplemento"]
			}
		],
		presentation: "injection",
		categories: ["antianemico", "suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "B-VAT FORTE",
		manufacturer: "Dropesac",
		barcode: "7754102000903",
		altcode: [],
		dci: [],
		presentation: "injection",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AUGMOX 625",
		manufacturer: "Dropesac",
		barcode: "7754102001078",
		altcode: [],
		dci: [
			{
				dciId: "Ko1vfYHpJL7x0yrhrc2m",
				name: "amoxicilina",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico"]
			},
			{
				dciId: "oQxGifZlcOhRcPt0vWR5",
				name: "acido clavulanico",
				measurement: 125.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AUGMOX 1000",
		manufacturer: "Dropesac",
		barcode: "7754102001085",
		altcode: [],
		dci: [
			{
				dciId: "Ko1vfYHpJL7x0yrhrc2m",
				name: "amoxicilina",
				measurement: 875.0,
				unit: "mg",
				categories: ["antibiotico"]
			},
			{
				dciId: "oQxGifZlcOhRcPt0vWR5",
				name: "acido clavulanico",
				measurement: 125.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TOBAN F",
		manufacturer: "Eurofarma",
		barcode: "7758112001486",
		altcode: [],
		dci: [
			{
				dciId: "dJou0056EErtm9UNj107",
				name: "loperamida",
				measurement: 2.0,
				unit: "mg",
				categories: ["antidiarreico"]
			}
		],
		presentation: "tablet",
		categories: ["antidiarreico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "RHINO-CLO",
		manufacturer: "Eurofarma",
		barcode: "7758112002674",
		altcode: [],
		dci: [
			{
				dciId: "xLaxqqMLVwB9Lu5DN3Zz",
				name: "sodio",
				measurement: 0.9,
				unit: "mg",
				categories: ["suero rehidratante"]
			}
		],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CEFALOGEN",
		manufacturer: "Eurofarma",
		barcode: "7891317207311",
		altcode: [],
		dci: [
			{
				dciId: "gAaSpB7f6M7XkY1pXccj",
				name: "ceftriaxona",
				measurement: 1.0,
				unit: "g",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MIODOLOR RELAX",
		manufacturer: "Falab Peru",
		barcode: "1822434254663",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 450.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "QpmtNz4EVlj6P4qtr7eN",
				name: "orfenadrina",
				measurement: 35.0,
				unit: "mg",
				categories: ["relajante muscular", "analgesico"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "antipiretico", "relajante muscular"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "D'DARA FLEX",
		manufacturer: "Falab Peru",
		barcode: "786071086883",
		altcode: [],
		dci: [
			{
				dciId: "05q23VyotLp1C33dPXOR",
				name: "cartilago tiburon",
				measurement: 500.0,
				unit: "g",
				categories: ["suplemento", "antiinflamatorio"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "D'DARA FLEX",
		manufacturer: "Falab Peru",
		barcode: "786071086883",
		altcode: [],
		dci: [
			{
				dciId: "05q23VyotLp1C33dPXOR",
				name: "cartilago tiburon",
				measurement: 500.0,
				unit: "g",
				categories: ["suplemento", "antiinflamatorio"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "D'DARA",
		manufacturer: "Falab Peru",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "adq0PKe5RXPVAHryO9ZD",
				name: "colageno hidrolizado",
				measurement: 500.0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "D'DARA",
		manufacturer: "Falab Peru",
		barcode: "786071086876",
		altcode: [],
		dci: [
			{
				dciId: "adq0PKe5RXPVAHryO9ZD",
				name: "colageno hidrolizado",
				measurement: 500.0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HISTALICIN",
		manufacturer: "Falab Peru",
		barcode: "7755570000037",
		altcode: [],
		dci: [
			{
				dciId: "y4kT9OfqaqPqBsnbsdps",
				name: "cetirizina",
				measurement: 10.0,
				unit: "mg",
				categories: ["antihistaminico"]
			}
		],
		presentation: "tablet",
		categories: ["antihistaminico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "VELOR",
		manufacturer: "Falab Peru",
		barcode: "7753737000050",
		altcode: [],
		dci: [
			{
				dciId: "dy6ucMmyuZfNIUNr20Mx",
				name: "levonorgestrel",
				measurement: 1.5,
				unit: "mg",
				categories: ["anticonceptivo"]
			}
		],
		presentation: "tablet",
		categories: ["anticonceptivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "EXUNA",
		manufacturer: "Farvet",
		barcode: "7750625000161",
		altcode: [],
		dci: [
			{
				dciId: "DOBuMfCpNQTxVNYuC1Ok",
				name: "algestona",
				measurement: 150.0,
				unit: "mg",
				categories: ["anticonceptivo", "hormonal"]
			},
			{
				dciId: "7m4tRVPP0oLhdj6lUrew",
				name: "undecilato estradiol",
				measurement: 10.0,
				unit: "mg",
				categories: ["anticonceptivo", "hormonal"]
			}
		],
		presentation: "injection",
		categories: ["anticonceptivo", "hormonal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MEROPENEM 1G",
		manufacturer: "Fresenius Kabi",
		barcode: "4052682007637",
		altcode: [],
		dci: [
			{
				dciId: "30vISwRD9oqBmHLWVcwx",
				name: "meropenem",
				measurement: 1.0,
				unit: "g",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CONTRAVARIS",
		manufacturer: "Garden House",
		barcode: "7803510000644",
		altcode: [],
		dci: [
			{
				dciId: "7ywUEvxk4WSHfYX1Mgp9",
				name: "ruscus aculeatus",
				measurement: 100.0,
				unit: "mg",
				categories: ["flebotonico", "vasoprotector"]
			}
		],
		presentation: "capsule",
		categories: ["flebotonico", "vasoprotector"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BISOPROPOL 5MG",
		manufacturer: "Generion Pharma",
		barcode: "7753748001916",
		altcode: [],
		dci: [
			{
				dciId: "kO4sjiQ34CUb4ygxWV9d",
				name: "bisoprolol",
				measurement: 5.0,
				unit: "mg",
				categories: ["betabloqueador", "presion"]
			}
		],
		presentation: "tablet",
		categories: ["betabloqueador", "presion"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SUEROX UVA",
		manufacturer: "Genomma Lab",
		barcode: "650240061325",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SUEROX NARANJA-MANDARINA",
		manufacturer: "Genomma Lab",
		barcode: "650240063237",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SUEROX MORA AZUL-HIERBABUENA",
		manufacturer: "Genomma Lab",
		barcode: "650240063244",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SUEROX FRUTOS ROJOS-TROPICALES",
		manufacturer: "Genomma Lab",
		barcode: "650240069192",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NIKZON",
		manufacturer: "Genomma Lab",
		barcode: "650240001314",
		altcode: [],
		dci: [
			{
				dciId: "7ywUEvxk4WSHfYX1Mgp9",
				name: "ruscus aculeatus",
				measurement: 20.0,
				unit: "mg",
				categories: ["flebotonico", "vasoprotector"]
			},
			{
				dciId: "Gwe586ikflOvyGCTBsn5",
				name: "lactobacillus sporogenes",
				measurement: 8.3,
				unit: "mg",
				categories: ["probiotico"]
			},
			{
				dciId: "mu7ghwVbCXzhZ8qwbJLI",
				name: "vitamina c",
				measurement: 40.0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "tablet",
		categories: ["flebotonico", "vasoprotector", "probiotico", "suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CHAO NF",
		manufacturer: "Genomma Lab",
		barcode: "7756459000889",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 500.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "muKCfp6ceRKxvyLijUIT",
				name: "fenilefrina",
				measurement: 5.0,
				unit: "mg",
				categories: ["descongestionante", "antigripal"]
			},
			{
				dciId: "RloCDIz4cbOvpA3QTSBI",
				name: "clorfenamina",
				measurement: 2.0,
				unit: "mg",
				categories: ["antihistaminico", "antigripal"]
			}
		],
		presentation: "tablet",
		categories: [
			"analgesico",
			"antipiretico",
			"descongestionante",
			"antigripal",
			"antihistaminico"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BIOELECTRO",
		manufacturer: "Genomma Lab",
		barcode: "7756459000919",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 250.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "yb0pXftPfgUHgoQ2ZRpo",
				name: "acido acetilsalicilico",
				measurement: 250.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico", "antitrombotico", "antiinflamatorio"]
			},
			{
				dciId: "POr4z4DdPpKilPOibID6",
				name: "cafeina",
				measurement: 65.0,
				unit: "mg",
				categories: ["analgesico", "estimulador"]
			}
		],
		presentation: "tablet",
		categories: [
			"analgesico",
			"antipiretico",
			"antitrombotico",
			"antiinflamatorio",
			"estimulador"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GLORANTA CAJA",
		manufacturer: "Good Brands",
		barcode: "7757016000281",
		altcode: [],
		dci: [
			{
				dciId: "bLmDpOSR1sgFdESUKezV",
				name: "jengibre",
				measurement: 0,
				unit: "g",
				categories: ["antigripal", "digestivo"]
			},
			{
				dciId: "QizD2xEKWv4zPR2XGhFO",
				name: "menta",
				measurement: 0,
				unit: "g",
				categories: ["digestivo", "antigripal"]
			}
		],
		presentation: "other",
		categories: ["antigripal", "digestivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GLORANTA",
		manufacturer: "Good Brands",
		barcode: "7757016000274",
		altcode: [],
		dci: [
			{
				dciId: "bLmDpOSR1sgFdESUKezV",
				name: "jengibre",
				measurement: 0,
				unit: "g",
				categories: ["antigripal", "digestivo"]
			},
			{
				dciId: "QizD2xEKWv4zPR2XGhFO",
				name: "menta",
				measurement: 0,
				unit: "g",
				categories: ["digestivo", "antigripal"]
			}
		],
		presentation: "other",
		categories: ["antigripal", "digestivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PANADOL NINOS",
		manufacturer: "Gsk",
		barcode: "7441026001276",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 160.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			}
		],
		presentation: "syrup",
		categories: ["analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PANADOL BEBES",
		manufacturer: "Gsk",
		barcode: "7441026001283",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 100.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			}
		],
		presentation: "syrup",
		categories: ["analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PANADOL FORTE",
		manufacturer: "Haleon",
		barcode: "7451079003516",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 500.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "POr4z4DdPpKilPOibID6",
				name: "cafeina",
				measurement: 65.0,
				unit: "mg",
				categories: ["analgesico", "estimulador"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "antipiretico", "estimulador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PANADOL ANTIGRIPAL NF",
		manufacturer: "Haleon",
		barcode: "7451079003509",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 500.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "muKCfp6ceRKxvyLijUIT",
				name: "fenilefrina",
				measurement: 5.0,
				unit: "mg",
				categories: ["descongestionante", "antigripal"]
			},
			{
				dciId: "RloCDIz4cbOvpA3QTSBI",
				name: "clorfenamina",
				measurement: 2.0,
				unit: "mg",
				categories: ["antihistaminico", "antigripal"]
			}
		],
		presentation: "tablet",
		categories: [
			"analgesico",
			"antipiretico",
			"descongestionante",
			"antigripal",
			"antihistaminico"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NOTIL",
		manufacturer: "Hersil",
		barcode: "7756133000051",
		altcode: [],
		dci: [
			{
				dciId: "dL9eusuTYiBvX1ADXeBQ",
				name: "clotrimazol",
				measurement: 1.0,
				unit: "g",
				categories: ["antimicotico"]
			},
			{
				dciId: "MTbj4bXvKL86Dt5OYLf9",
				name: "gentamicina",
				measurement: 0.1,
				unit: "g",
				categories: ["antibiotico"]
			},
			{
				dciId: "zQpfrpNBtJGg5mYHI0ro",
				name: "betametasona",
				measurement: 0.05,
				unit: "g",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "cream",
		categories: ["antimicotico", "antibiotico", "corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOLORAL",
		manufacturer: "Hersil",
		barcode: "7757310446334",
		altcode: [],
		dci: [
			{
				dciId: "VIWeU9GfL4D1AmYXOTdQ",
				name: "ibuprofeno",
				measurement: 100.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antipiretico"]
			}
		],
		presentation: "syrup",
		categories: ["antiinflamatorio", "analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CORIFAN",
		manufacturer: "Hersil",
		barcode: "7757310005234",
		altcode: [],
		dci: [
			{
				dciId: "RloCDIz4cbOvpA3QTSBI",
				name: "clorfenamina",
				measurement: 1.0,
				unit: "mg",
				categories: ["antihistaminico", "antigripal"]
			}
		],
		presentation: "syrup",
		categories: ["antihistaminico", "antigripal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PYRIDIUM 100MG",
		manufacturer: "Hersil",
		barcode: "7757310001281",
		altcode: [],
		dci: [
			{
				dciId: "uXlo6wAGwg8tYOUefpUV",
				name: "fenazopiridina",
				measurement: 100.0,
				unit: "mg",
				categories: ["analgesico", "urologico"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "urologico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "VINIL",
		manufacturer: "Indufarm",
		barcode: "7840653002081",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 75.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "injection",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "APIRON",
		manufacturer: "Indufarm",
		barcode: "7840653001398",
		altcode: [],
		dci: [
			{
				dciId: "vAyiAX3OFKopGsF0bltL",
				name: "metamizol",
				measurement: 1.0,
				unit: "g",
				categories: ["analgesico", "antipiretico", "antiespasmodico"]
			}
		],
		presentation: "injection",
		categories: ["analgesico", "antipiretico", "antiespasmodico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NEUROALIV 5000",
		manufacturer: "Intipharma",
		barcode: "7750288001307",
		altcode: [],
		dci: [
			{
				dciId: "4PME6zquptIa0F1d2SVL",
				name: "tiamina",
				measurement: 100.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "MzDoli6CvMArEyfd91Vm",
				name: "piridoxina",
				measurement: 100.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "zHuvbnqIVNuKeE8ujOJO",
				name: "vitamina b12",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "capsule",
		categories: ["suplemento", "antianemico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NAPROXPHARMA 550",
		manufacturer: "Intipharma",
		barcode: "7750288000287",
		altcode: [],
		dci: [
			{
				dciId: "5nH6j8IaqDFSL9O7ldil",
				name: "naproxeno",
				measurement: 550.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "tablet",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MICOTERBIN",
		manufacturer: "Intipharma",
		barcode: "7750288000218",
		altcode: [],
		dci: [
			{
				dciId: "jNz9WvdhTibJW6J8M2mf",
				name: "terbinafina",
				measurement: 1.0,
				unit: "mg",
				categories: ["antimicotico"]
			}
		],
		presentation: "cream",
		categories: ["antimicotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MICOTERBIN",
		manufacturer: "Intipharma",
		barcode: "7750288001567",
		altcode: [],
		dci: [
			{
				dciId: "jNz9WvdhTibJW6J8M2mf",
				name: "terbinafina",
				measurement: 1.0,
				unit: "mg",
				categories: ["antimicotico"]
			}
		],
		presentation: "syrup",
		categories: ["antimicotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HIGARIL 500",
		manufacturer: "Intipharma",
		barcode: "7750288001260",
		altcode: [],
		dci: [
			{
				dciId: "roy32AbwyVJRe2wSRL1G",
				name: "silimarina",
				measurement: 500.0,
				unit: "mg",
				categories: ["hepatoprotector"]
			}
		],
		presentation: "capsule",
		categories: ["hepatoprotector"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GYNOMAX NF",
		manufacturer: "Intipharma",
		barcode: "7750288000171",
		altcode: [],
		dci: [
			{
				dciId: "Zuswvo6w6EFBuBNNrzQa",
				name: "metronidazol",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico", "antimicotico", "antiparasitario"]
			},
			{
				dciId: "Vk8b0Oz5H2IHZXYDmrnn",
				name: "nistatina",
				measurement: 100000.0,
				unit: "mg",
				categories: ["antimicotico"]
			}
		],
		presentation: "other",
		categories: ["antibiotico", "antimicotico", "antiparasitario"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GYNOMAX NF",
		manufacturer: "Intipharma",
		barcode: "7750288000171",
		altcode: [],
		dci: [
			{
				dciId: "Zuswvo6w6EFBuBNNrzQa",
				name: "metronidazol",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico", "antimicotico", "antiparasitario"]
			},
			{
				dciId: "Vk8b0Oz5H2IHZXYDmrnn",
				name: "nistatina",
				measurement: 100000.0,
				unit: "mg",
				categories: ["antimicotico"]
			}
		],
		presentation: "other",
		categories: ["antibiotico", "antimicotico", "antiparasitario"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GASEOFLAT FAST",
		manufacturer: "Intipharma",
		barcode: "7750288001000",
		altcode: [],
		dci: [
			{
				dciId: "Q5fCtw9yM4sRtn6qC6W4",
				name: "simeticona",
				measurement: 125.0,
				unit: "mg",
				categories: ["antiflatulento"]
			}
		],
		presentation: "capsule",
		categories: ["antiflatulento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GASEOFLAT",
		manufacturer: "Intipharma",
		barcode: "7750288000799",
		altcode: [],
		dci: [
			{
				dciId: "Q5fCtw9yM4sRtn6qC6W4",
				name: "simeticona",
				measurement: 100.0,
				unit: "mg",
				categories: ["antiflatulento"]
			}
		],
		presentation: "syrup",
		categories: ["antiflatulento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "COLONFREE",
		manufacturer: "Intipharma",
		barcode: "7750288000898",
		altcode: [],
		dci: [
			{
				dciId: "yz8yjmdPGN6snx5NPb6g",
				name: "psyllium husk",
				measurement: 3.4,
				unit: "g",
				categories: ["laxante"]
			}
		],
		presentation: "powder",
		categories: ["laxante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ACIPRAL",
		manufacturer: "Intipharma",
		barcode: "7750288001116",
		altcode: [],
		dci: [
			{
				dciId: "9P8pX93iea6ptDb69Cbe",
				name: "omeprazol",
				measurement: 40.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "injection",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MUPIROCINA 2%",
		manufacturer: "Iqfarma",
		barcode: "77505842",
		altcode: [],
		dci: [
			{
				dciId: "woeRd3NRzVQuW5PI5OHJ",
				name: "mupirocina",
				measurement: 2.0,
				unit: "mg",
				categories: ["antibacteriano"]
			}
		],
		presentation: "ointment",
		categories: ["antibacteriano"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GASTRORAL",
		manufacturer: "Iqfarma",
		barcode: "7750942001582",
		altcode: [],
		dci: [
			{
				dciId: "HX23yzFxITbJGWZtSqAU",
				name: "magaldrato",
				measurement: 800.0,
				unit: "mg",
				categories: ["antiacido"]
			},
			{
				dciId: "Q5fCtw9yM4sRtn6qC6W4",
				name: "simeticona",
				measurement: 60.0,
				unit: "mg",
				categories: ["antiflatulento"]
			}
		],
		presentation: "syrup",
		categories: ["antiacido", "antiflatulento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FLATUZYM ADVANCE",
		manufacturer: "Iqfarma",
		barcode: "7750942009717",
		altcode: [],
		dci: [
			{
				dciId: "jaVlA2s09NGuTTYk3iZf",
				name: "enzima digestiva",
				measurement: 50.0,
				unit: "mg",
				categories: ["digestivo"]
			},
			{
				dciId: "jaVlA2s09NGuTTYk3iZf",
				name: "enzima digestiva",
				measurement: 13.0,
				unit: "mg",
				categories: ["digestivo"]
			},
			{
				dciId: "jaVlA2s09NGuTTYk3iZf",
				name: "enzima digestiva",
				measurement: 24.0,
				unit: "mg",
				categories: ["digestivo"]
			},
			{
				dciId: "5bukocQMaczA0cSHb3UB",
				name: "bromoprida",
				measurement: 5.0,
				unit: "mg",
				categories: ["gastrocinetico", "antiemetico"]
			},
			{
				dciId: "Q5fCtw9yM4sRtn6qC6W4",
				name: "simeticona",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiflatulento"]
			}
		],
		presentation: "capsule",
		categories: ["digestivo", "gastrocinetico", "antiemetico", "antiflatulento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GERIAMAXX DB",
		manufacturer: "Jcm & Mf",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "K1UWwlufdMFjImlhB7LM",
				name: "hmb",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			},
			{
				dciId: "63ujuoIHAMa5BcOEVOVh",
				name: "magnesio",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			},
			{
				dciId: "LmVnRz8ZHih8iM8emAr2",
				name: "zinc",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GERIAMAXX",
		manufacturer: "Jcm & Mf",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "K1UWwlufdMFjImlhB7LM",
				name: "hmb",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			},
			{
				dciId: "63ujuoIHAMa5BcOEVOVh",
				name: "magnesio",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			},
			{
				dciId: "LmVnRz8ZHih8iM8emAr2",
				name: "zinc",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GERIAMAXX",
		manufacturer: "Jcm & Mf",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "K1UWwlufdMFjImlhB7LM",
				name: "hmb",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			},
			{
				dciId: "63ujuoIHAMa5BcOEVOVh",
				name: "magnesio",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			},
			{
				dciId: "LmVnRz8ZHih8iM8emAr2",
				name: "zinc",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CITRATO DE POTASIO",
		manufacturer: "Jcm & Mf",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "9Y3VZbHC6BYdza8KWinP",
				name: "potasio",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CITRATO DE MAGNESIO",
		manufacturer: "Jcm & Mf",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "63ujuoIHAMa5BcOEVOVh",
				name: "magnesio",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CITRATO DE CALCIO",
		manufacturer: "Jcm & Mf",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "LfrcJBDNKzAb3i2oUErO",
				name: "calcio",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MIODEL RELAX",
		manufacturer: "Laboratorios Delfarma",
		barcode: "7752301000717",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 450.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "QpmtNz4EVlj6P4qtr7eN",
				name: "orfenadrina",
				measurement: 35.0,
				unit: "mg",
				categories: ["relajante muscular", "analgesico"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "antipiretico", "relajante muscular"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LEVO-DEL",
		manufacturer: "Laboratorios Delfarma",
		barcode: "7752301000359",
		altcode: [],
		dci: [
			{
				dciId: "y4kT9OfqaqPqBsnbsdps",
				name: "cetirizina",
				measurement: 5.0,
				unit: "mg",
				categories: ["antihistaminico"]
			}
		],
		presentation: "tablet",
		categories: ["antihistaminico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SALBUTAMOL 100 MCG/DOSIS",
		manufacturer: "Labot",
		barcode: "7751128001396",
		altcode: [],
		dci: [
			{
				dciId: "vWP4FM7RkORIrqnd6nBg",
				name: "salbutamol",
				measurement: 100.0,
				unit: "mg",
				categories: ["asma", "broncodilatador"]
			}
		],
		presentation: "injection",
		categories: ["asma", "broncodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "METAMIZOL SODICO 1G/2ML",
		manufacturer: "Labot",
		barcode: "7751128002553",
		altcode: [],
		dci: [
			{
				dciId: "vAyiAX3OFKopGsF0bltL",
				name: "metamizol",
				measurement: 1.0,
				unit: "g",
				categories: ["analgesico", "antipiretico", "antiespasmodico"]
			}
		],
		presentation: "injection",
		categories: ["analgesico", "antipiretico", "antiespasmodico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DEXAMETASONA 4MG/1ML",
		manufacturer: "Labot",
		barcode: "7751128003611",
		altcode: [],
		dci: [
			{
				dciId: "4dSUIiPnJJe8ulOWNzcK",
				name: "dexametasona",
				measurement: 4.0,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "injection",
		categories: ["corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLORFENAMINA 10MG/1ML",
		manufacturer: "Labot",
		barcode: "7751128001037",
		altcode: [],
		dci: [
			{
				dciId: "RloCDIz4cbOvpA3QTSBI",
				name: "clorfenamina",
				measurement: 10.0,
				unit: "mg",
				categories: ["antihistaminico", "antigripal"]
			}
		],
		presentation: "injection",
		categories: ["antihistaminico", "antigripal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HIERROFE COMPLEX",
		manufacturer: "Labsuperfood",
		barcode: "0659525543310",
		altcode: [],
		dci: [
			{
				dciId: "U896iDwG8mZxOgHVdAal",
				name: "hierro sucrosa",
				measurement: 0,
				unit: "g",
				categories: ["antianemico", "suplemento"]
			},
			{
				dciId: "LfrcJBDNKzAb3i2oUErO",
				name: "calcio",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			},
			{
				dciId: "brlZ5Vv4pBhvPqgBE0hI",
				name: "vitamina d",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "powder",
		categories: ["antianemico", "suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TERRAMISOL-A",
		manufacturer: "Lansier",
		barcode: "7750778000094",
		altcode: [],
		dci: [
			{
				dciId: "fNbmEHzi4lXkbqYWhiiz",
				name: "oxitetraciclina",
				measurement: 0.5,
				unit: "g",
				categories: ["antibiotico", "oftalmica"]
			},
			{
				dciId: "HFZmHR9RmRFSpUUU7Eop",
				name: "polimixina b",
				measurement: 1000000.0,
				unit: "mg",
				categories: ["antibiotico", "oftalmica"]
			}
		],
		presentation: "ointment",
		categories: ["antibiotico", "oftalmica"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "OTIDOL",
		manufacturer: "Lansier",
		barcode: "7750778001909",
		altcode: [],
		dci: [
			{
				dciId: "e3MXf7dnjHW7C1Vmul1A",
				name: "cloruro sodio",
				measurement: 0,
				unit: "ml",
				categories: ["suero fisiologico"]
			}
		],
		presentation: "syrup",
		categories: ["suero fisiologico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HUMED",
		manufacturer: "Lansier",
		barcode: "7750778592292",
		altcode: [],
		dci: [
			{
				dciId: "hj2FiZDXYcqMBDFFzWaT",
				name: "hipromelosa",
				measurement: 0.3,
				unit: "mg",
				categories: ["oftalmica"]
			}
		],
		presentation: "syrup",
		categories: ["oftalmica"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FRAMIDEX NF",
		manufacturer: "Lansier",
		barcode: "7750778000032",
		altcode: [],
		dci: [
			{
				dciId: "EP1pNGkOyIVIV8nLbePR",
				name: "framicetina",
				measurement: 1.0,
				unit: "mg",
				categories: ["antibiotico", "oftalmica"]
			},
			{
				dciId: "4dSUIiPnJJe8ulOWNzcK",
				name: "dexametasona",
				measurement: 0.1,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "syrup",
		categories: ["antibiotico", "oftalmica", "corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FLORIL SMART GAMER",
		manufacturer: "Lansier",
		barcode: "7750778001787",
		altcode: [],
		dci: [
			{
				dciId: "eTJfcOHLDDVG7MfZLe7y",
				name: "tetrahidrozolina",
				measurement: 0.05,
				unit: "mg",
				categories: ["oftalmica", "nasal"]
			}
		],
		presentation: "syrup",
		categories: ["oftalmica", "nasal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FLORIL",
		manufacturer: "Lansier",
		barcode: "7750778000247",
		altcode: [],
		dci: [
			{
				dciId: "0zPumHuE9DFFmMSJGSLg",
				name: "nafazolina",
				measurement: 0.03,
				unit: "mg",
				categories: ["nasal", "oftalmica"]
			}
		],
		presentation: "syrup",
		categories: ["nasal", "oftalmica"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LIDOCAINA 5% UNGUENTO",
		manufacturer: "Lusa",
		barcode: "7750577785741",
		altcode: [],
		dci: [
			{
				dciId: "p3ErcWjKebmqkspvKCCm",
				name: "lidocaina",
				measurement: 5.0,
				unit: "mg",
				categories: ["anestesico"]
			}
		],
		presentation: "ointment",
		categories: ["anestesico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOLOSIN 2% GEL",
		manufacturer: "Lyafarm",
		barcode: "764451034570",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 2.32,
				unit: "g",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "gel",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "METAPIRON",
		manufacturer: "M&F",
		barcode: "7776927000205",
		altcode: [],
		dci: [
			{
				dciId: "vAyiAX3OFKopGsF0bltL",
				name: "metamizol",
				measurement: 1.0,
				unit: "g",
				categories: ["analgesico", "antipiretico", "antiespasmodico"]
			}
		],
		presentation: "injection",
		categories: ["analgesico", "antipiretico", "antiespasmodico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SILDENAFILO 100MG",
		manufacturer: "Marfan",
		barcode: "7754981001176",
		altcode: [],
		dci: [
			{
				dciId: "fpzlB1jimywmAJr7wGWW",
				name: "sildenafilo",
				measurement: 100.0,
				unit: "mg",
				categories: ["vasodilatador"]
			}
		],
		presentation: "tablet",
		categories: ["vasodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LIMONADA MARKOS",
		manufacturer: "Markos",
		barcode: "7751207001187",
		altcode: [],
		dci: [
			{
				dciId: "xLaxqqMLVwB9Lu5DN3Zz",
				name: "sodio",
				measurement: 2.5,
				unit: "mg",
				categories: ["suero rehidratante"]
			}
		],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SUERO FISIOLOGICO",
		manufacturer: "Medifarma",
		barcode: "7759307434041",
		altcode: [],
		dci: [
			{
				dciId: "xLaxqqMLVwB9Lu5DN3Zz",
				name: "sodio",
				measurement: 9.0,
				unit: "mg",
				categories: ["suero rehidratante"]
			}
		],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SORBAMIN 55 SP NF",
		manufacturer: "Medifarma",
		barcode: "7759307017015",
		altcode: [],
		dci: [
			{
				dciId: "xLaxqqMLVwB9Lu5DN3Zz",
				name: "sodio",
				measurement: 0,
				unit: "ml",
				categories: ["suero rehidratante"]
			}
		],
		presentation: "powder",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SITIDERM NF",
		manufacturer: "Medifarma",
		barcode: "7759307005548",
		altcode: [],
		dci: [
			{
				dciId: "zQpfrpNBtJGg5mYHI0ro",
				name: "betametasona",
				measurement: 0.05,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			},
			{
				dciId: "MTbj4bXvKL86Dt5OYLf9",
				name: "gentamicina",
				measurement: 0.1,
				unit: "mg",
				categories: ["antibiotico"]
			},
			{
				dciId: "dL9eusuTYiBvX1ADXeBQ",
				name: "clotrimazol",
				measurement: 1.0,
				unit: "mg",
				categories: ["antimicotico"]
			}
		],
		presentation: "cream",
		categories: ["corticoide", "antiinflamatorio", "antibiotico", "antimicotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SAL DE ANDREWS",
		manufacturer: "Medifarma",
		barcode: "7759307017077",
		altcode: [],
		dci: [
			{
				dciId: "xLaxqqMLVwB9Lu5DN3Zz",
				name: "sodio",
				measurement: 1.13,
				unit: "g",
				categories: ["suero rehidratante"]
			},
			{
				dciId: "63ujuoIHAMa5BcOEVOVh",
				name: "magnesio",
				measurement: 0.87,
				unit: "g",
				categories: ["suplemento"]
			},
			{
				dciId: "hQsluI32sgcAIQsIOKZ2",
				name: "bicarbonato sodio",
				measurement: 0.975,
				unit: "g",
				categories: ["antiacido"]
			}
		],
		presentation: "powder",
		categories: ["suero rehidratante", "suplemento", "antiacido"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "RYNATAN NF",
		manufacturer: "Medifarma",
		barcode: "7759307017930",
		altcode: [],
		dci: [
			{
				dciId: "muKCfp6ceRKxvyLijUIT",
				name: "fenilefrina",
				measurement: 10.0,
				unit: "mg",
				categories: ["descongestionante", "antigripal"]
			},
			{
				dciId: "RloCDIz4cbOvpA3QTSBI",
				name: "clorfenamina",
				measurement: 4.0,
				unit: "mg",
				categories: ["antihistaminico", "antigripal"]
			}
		],
		presentation: "tablet",
		categories: ["descongestionante", "antigripal", "antihistaminico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GRAVOL",
		manufacturer: "Medifarma",
		barcode: "7759307433396",
		altcode: [],
		dci: [
			{
				dciId: "loyOtWOf8u0mUzKwr0dj",
				name: "dimenhidrinato",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiemetico", "antivertiginoso"]
			}
		],
		presentation: "tablet",
		categories: ["antiemetico", "antivertiginoso"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FLUIBRONCOL ORAL",
		manufacturer: "Medifarma",
		barcode: "7759307004398",
		altcode: [],
		dci: [
			{
				dciId: "ogawL7qXukF3nG9xOnRd",
				name: "acetilcisteina",
				measurement: 600.0,
				unit: "mg",
				categories: ["mucolitico", "expectorante"]
			}
		],
		presentation: "powder",
		categories: ["mucolitico", "expectorante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FLUIBRONCOL ORAL",
		manufacturer: "Medifarma",
		barcode: "7759307004275",
		altcode: [],
		dci: [
			{
				dciId: "ogawL7qXukF3nG9xOnRd",
				name: "acetilcisteina",
				measurement: 200.0,
				unit: "mg",
				categories: ["mucolitico", "expectorante"]
			}
		],
		presentation: "powder",
		categories: ["mucolitico", "expectorante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ELECTRORAL PEDIATRICO NF FRESA",
		manufacturer: "Medifarma",
		barcode: "7759307017497",
		altcode: [],
		dci: [
			{
				dciId: "e3MXf7dnjHW7C1Vmul1A",
				name: "cloruro sodio",
				measurement: 0,
				unit: "ml",
				categories: ["suero fisiologico"]
			}
		],
		presentation: "syrup",
		categories: ["suero fisiologico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ELECTRORAL NF FRESA",
		manufacturer: "Medifarma",
		barcode: "7759307017640",
		altcode: [],
		dci: [
			{
				dciId: "xLaxqqMLVwB9Lu5DN3Zz",
				name: "sodio",
				measurement: 0,
				unit: "ml",
				categories: ["suero rehidratante"]
			},
			{
				dciId: "9Y3VZbHC6BYdza8KWinP",
				name: "potasio",
				measurement: 0,
				unit: "ml",
				categories: ["suplemento"]
			},
			{
				dciId: "ubv06apzVWMt5SHmU5KV",
				name: "glucosa",
				measurement: 0,
				unit: "ml",
				categories: ["suero rehidratante"]
			}
		],
		presentation: "syrup",
		categories: ["suero rehidratante", "suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "COLIRIO EYEMO 0,05%",
		manufacturer: "Medifarma",
		barcode: "7759307009898",
		altcode: [],
		dci: [
			{
				dciId: "cZ1PGlTjJ9zXk8I8mcJf",
				name: "tetrizolina",
				measurement: 0.05,
				unit: "mg",
				categories: ["oftalmica"]
			}
		],
		presentation: "syrup",
		categories: ["oftalmica"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOXICICLINA HICLATO 100MG",
		manufacturer: "Medrock",
		barcode: "770929000713",
		altcode: [],
		dci: [
			{
				dciId: "xRAzljS3O2GoAbwX6hvR",
				name: "doxiciclina",
				measurement: 100.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "capsule",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PLIDAN COMPUESTO FORTE",
		manufacturer: "Megalabs",
		barcode: "7730969307423",
		altcode: [],
		dci: [
			{
				dciId: "lmhcsqayspAJRYIrr8n9",
				name: "escopolamina",
				measurement: 20.0,
				unit: "mg",
				categories: ["antiespasmodico"]
			},
			{
				dciId: "vAyiAX3OFKopGsF0bltL",
				name: "metamizol",
				measurement: 2500.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico", "antiespasmodico"]
			}
		],
		presentation: "injection",
		categories: ["antiespasmodico", "analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: true
	},
	{
		brand: "BISMUTOL",
		manufacturer: "Millet",
		barcode: "7754981001169",
		altcode: [],
		dci: [
			{
				dciId: "1aZ9TGh7OW1OCWPiP9LZ",
				name: "subsalicilato bismuto",
				measurement: 262.5,
				unit: "mg",
				categories: ["antidiarreico", "antiacido"]
			}
		],
		presentation: "tablet",
		categories: ["antidiarreico", "antiacido"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "KIDS GOODLIFE",
		manufacturer: "Nutri Innova",
		barcode: "",
		altcode: [],
		dci: [
			{
				dciId: "annZAxNbWZaOGgEJoFZK",
				name: "vitaminas",
				measurement: 0,
				unit: "g",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NEUROBION 5000",
		manufacturer: "P&G",
		barcode: "7500435231015",
		altcode: [],
		dci: [
			{
				dciId: "4PME6zquptIa0F1d2SVL",
				name: "tiamina",
				measurement: 100.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "MzDoli6CvMArEyfd91Vm",
				name: "piridoxina",
				measurement: 100.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "zHuvbnqIVNuKeE8ujOJO",
				name: "vitamina b12",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "capsule",
		categories: ["suplemento", "antianemico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMOXICILINA + ACIDO CLAVULONICO",
		manufacturer: "Pharma Genericos",
		barcode: "7759765003384",
		altcode: [],
		dci: [
			{
				dciId: "Ko1vfYHpJL7x0yrhrc2m",
				name: "amoxicilina",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico"]
			},
			{
				dciId: "oQxGifZlcOhRcPt0vWR5",
				name: "acido clavulanico",
				measurement: 125.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLORURO DE SODIO",
		manufacturer: "Pharma Genericos",
		barcode: "7759765001144",
		altcode: [],
		dci: [
			{
				dciId: "xLaxqqMLVwB9Lu5DN3Zz",
				name: "sodio",
				measurement: 100.0,
				unit: "ml",
				categories: ["suero rehidratante"]
			}
		],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SILDEX 100",
		manufacturer: "Pharmed Corporation",
		barcode: "7753748000063",
		altcode: [],
		dci: [
			{
				dciId: "fpzlB1jimywmAJr7wGWW",
				name: "sildenafilo",
				measurement: 100.0,
				unit: "mg",
				categories: ["vasodilatador"]
			}
		],
		presentation: "tablet",
		categories: ["vasodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MIOPRESS FORTE",
		manufacturer: "Pharmed Corporation",
		barcode: "7753748000407",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			},
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 500.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "QpmtNz4EVlj6P4qtr7eN",
				name: "orfenadrina",
				measurement: 75.0,
				unit: "mg",
				categories: ["relajante muscular", "analgesico"]
			}
		],
		presentation: "tablet",
		categories: [
			"antiinflamatorio",
			"analgesico",
			"antirreumatico",
			"antipiretico",
			"relajante muscular"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOLONEUROPRESS FORTE",
		manufacturer: "Pharmed Corporation",
		barcode: "7753748000162",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			},
			{
				dciId: "4PME6zquptIa0F1d2SVL",
				name: "tiamina",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "MzDoli6CvMArEyfd91Vm",
				name: "piridoxina",
				measurement: 50.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "rzJ9U647q8FYNZxLb0wt",
				name: "cianocobalamina",
				measurement: 1.0,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "tablet",
		categories: [
			"antiinflamatorio",
			"analgesico",
			"antirreumatico",
			"suplemento",
			"antianemico"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "E PROCAPS",
		manufacturer: "Procaps",
		barcode: "7703153017415",
		altcode: [],
		dci: [
			{
				dciId: "YIEAmxsnfT6w1AAFrMWn",
				name: "vitamina e",
				measurement: 400.0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "capsule",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "REPRIMAN",
		manufacturer: "Quilab",
		barcode: "7751257023474",
		altcode: [],
		dci: [
			{
				dciId: "vAyiAX3OFKopGsF0bltL",
				name: "metamizol",
				measurement: 500.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico", "antiespasmodico"]
			}
		],
		presentation: "syrup",
		categories: ["analgesico", "antipiretico", "antiespasmodico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "REPRIMAN",
		manufacturer: "Quilab",
		barcode: "7751257021562",
		altcode: [],
		dci: [
			{
				dciId: "vAyiAX3OFKopGsF0bltL",
				name: "metamizol",
				measurement: 250.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico", "antiespasmodico"]
			}
		],
		presentation: "syrup",
		categories: ["analgesico", "antipiretico", "antiespasmodico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NODIAL",
		manufacturer: "Quilab",
		barcode: "7751257970037",
		altcode: [],
		dci: [
			{
				dciId: "dL9eusuTYiBvX1ADXeBQ",
				name: "clotrimazol",
				measurement: 1.0,
				unit: "g",
				categories: ["antimicotico"]
			},
			{
				dciId: "MTbj4bXvKL86Dt5OYLf9",
				name: "gentamicina",
				measurement: 0.1,
				unit: "g",
				categories: ["antibiotico"]
			},
			{
				dciId: "zQpfrpNBtJGg5mYHI0ro",
				name: "betametasona",
				measurement: 0.05,
				unit: "g",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "cream",
		categories: ["antimicotico", "antibiotico", "corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "COMPLEJO B",
		manufacturer: "Quilab",
		barcode: "7751257006903",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BETAMETASONA 0,05%",
		manufacturer: "Quilab",
		barcode: "7751257713184",
		altcode: [],
		dci: [
			{
				dciId: "zQpfrpNBtJGg5mYHI0ro",
				name: "betametasona",
				measurement: 0.05,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "cream",
		categories: ["corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ANEURIM B12 20000",
		manufacturer: "Quilab",
		barcode: "7751257023467",
		altcode: [],
		dci: [
			{
				dciId: "rzJ9U647q8FYNZxLb0wt",
				name: "cianocobalamina",
				measurement: 2.0,
				unit: "ml",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "injection",
		categories: ["suplemento", "antianemico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ROXTIL B",
		manufacturer: "Roxfarma",
		barcode: "7750281001717",
		altcode: [],
		dci: [
			{
				dciId: "dL9eusuTYiBvX1ADXeBQ",
				name: "clotrimazol",
				measurement: 1.0,
				unit: "g",
				categories: ["antimicotico"]
			},
			{
				dciId: "MTbj4bXvKL86Dt5OYLf9",
				name: "gentamicina",
				measurement: 0.1,
				unit: "g",
				categories: ["antibiotico"]
			},
			{
				dciId: "zQpfrpNBtJGg5mYHI0ro",
				name: "betametasona",
				measurement: 0.05,
				unit: "g",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "cream",
		categories: ["antimicotico", "antibiotico", "corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PORTIL NF",
		manufacturer: "Sanfer",
		barcode: "7750215029244",
		altcode: [],
		dci: [
			{
				dciId: "dL9eusuTYiBvX1ADXeBQ",
				name: "clotrimazol",
				measurement: 1.0,
				unit: "g",
				categories: ["antimicotico"]
			},
			{
				dciId: "MTbj4bXvKL86Dt5OYLf9",
				name: "gentamicina",
				measurement: 0.1,
				unit: "g",
				categories: ["antibiotico"]
			},
			{
				dciId: "zQpfrpNBtJGg5mYHI0ro",
				name: "betametasona",
				measurement: 0.05,
				unit: "g",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "cream",
		categories: ["antimicotico", "antibiotico", "corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BUSCAPINA COMPOSITUM N",
		manufacturer: "Sanofi",
		barcode: "7703202009231",
		altcode: [],
		dci: [
			{
				dciId: "tpIZHhmXbB8kgq5X2WQI",
				name: "hioscina",
				measurement: 10.0,
				unit: "mg",
				categories: ["antiespasmodico"]
			},
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 500.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			}
		],
		presentation: "capsule",
		categories: ["antiespasmodico", "analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ENTEROGERMINA",
		manufacturer: "Sanofi",
		barcode: "3582910009900",
		altcode: [],
		dci: [
			{
				dciId: "wIf6Ci9TT0o0nvoqbo2R",
				name: "bacillus clausii",
				measurement: 5.0,
				unit: "ml",
				categories: ["probiotico", "inmunomodulador"]
			}
		],
		presentation: "syrup",
		categories: ["probiotico", "inmunomodulador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "VIVAMAS",
		manufacturer: "Sebalfarma",
		barcode: "7759405000902",
		altcode: [],
		dci: [
			{
				dciId: "63ujuoIHAMa5BcOEVOVh",
				name: "magnesio",
				measurement: 300.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "LmVnRz8ZHih8iM8emAr2",
				name: "zinc",
				measurement: 10.0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "tablet",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TOTAL-FLEXX FORTE",
		manufacturer: "Sebalfarma",
		barcode: "7759405000056",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 2.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "gel",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GASEOBAL",
		manufacturer: "Sebalfarma",
		barcode: "7759405000445",
		altcode: [],
		dci: [
			{
				dciId: "Q5fCtw9yM4sRtn6qC6W4",
				name: "simeticona",
				measurement: 125.0,
				unit: "mg",
				categories: ["antiflatulento"]
			}
		],
		presentation: "capsule",
		categories: ["antiflatulento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CALMAGEZE",
		manufacturer: "Sebalfarma",
		barcode: "7759405000872",
		altcode: [],
		dci: [
			{
				dciId: "IdOaEsvLo0eYKC8CAahY",
				name: "ketorolaco",
				measurement: 60.0,
				unit: "mg",
				categories: ["analgesico", "antiinflamatorio"]
			}
		],
		presentation: "injection",
		categories: ["analgesico", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ENTEROFLORIFAR",
		manufacturer: "Sherfarma",
		barcode: "7751946004449",
		altcode: [],
		dci: [
			{
				dciId: "wIf6Ci9TT0o0nvoqbo2R",
				name: "bacillus clausii",
				measurement: 5.0,
				unit: "ml",
				categories: ["probiotico", "inmunomodulador"]
			}
		],
		presentation: "injection",
		categories: ["probiotico", "inmunomodulador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CARDIVAS 12.5",
		manufacturer: "Sun Pharma",
		barcode: "8901127002842",
		altcode: [],
		dci: [
			{
				dciId: "l9TacSBG5a3yC2RjkzfN",
				name: "carvedilol",
				measurement: 12.5,
				unit: "mg",
				categories: ["betabloqueador", "presion"]
			}
		],
		presentation: "tablet",
		categories: ["betabloqueador", "presion"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LIDOCAINA 2%",
		manufacturer: "Swiss",
		barcode: "7753803000625",
		altcode: [],
		dci: [
			{
				dciId: "p3ErcWjKebmqkspvKCCm",
				name: "lidocaina",
				measurement: 2.0,
				unit: "mg",
				categories: ["anestesico"]
			}
		],
		presentation: "injection",
		categories: ["anestesico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LIDOCAINA 2%",
		manufacturer: "Swiss",
		barcode: "7753803000625",
		altcode: [],
		dci: [
			{
				dciId: "p3ErcWjKebmqkspvKCCm",
				name: "lidocaina",
				measurement: 2.0,
				unit: "mg",
				categories: ["anestesico"]
			}
		],
		presentation: "injection",
		categories: ["anestesico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "RHINO-BB DM",
		manufacturer: "Teva",
		barcode: "7750831020205",
		altcode: [],
		dci: [
			{
				dciId: "xLaxqqMLVwB9Lu5DN3Zz",
				name: "sodio",
				measurement: 9.0,
				unit: "mg",
				categories: ["suero rehidratante"]
			}
		],
		presentation: "syrup",
		categories: ["suero rehidratante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GINGISONA B",
		manufacturer: "Teva",
		barcode: "7750831020113",
		altcode: [],
		dci: [
			{
				dciId: "w5sdRRR3iw4aETQEWTiK",
				name: "bencidamina",
				measurement: 0.3,
				unit: "mg",
				categories: ["analgesico", "antiinflamatorio"]
			}
		],
		presentation: "syrup",
		categories: ["analgesico", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ROZIMIL",
		manufacturer: "Tobal",
		barcode: "7759508000403",
		altcode: [],
		dci: [
			{
				dciId: "gAaSpB7f6M7XkY1pXccj",
				name: "ceftriaxona",
				measurement: 1.0,
				unit: "g",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LIAMICIN",
		manufacturer: "Tobal",
		barcode: "7759508000663",
		altcode: [],
		dci: [
			{
				dciId: "FFGBOrsY2zhtLTWWIGVc",
				name: "lincomicina",
				measurement: 600.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GENTAMICINA 0,3%",
		manufacturer: "Vitaline",
		barcode: "7752343000010",
		altcode: [],
		dci: [
			{
				dciId: "MTbj4bXvKL86Dt5OYLf9",
				name: "gentamicina",
				measurement: 0.3,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "syrup",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMBROXOL PEDIATRICO",
		manufacturer: "Portugal",
		barcode: "7750215027004",
		altcode: [],
		dci: [
			{
				dciId: "wJRnkM3trj8zfMgkZXAy",
				name: "ambroxol",
				measurement: 15.0,
				unit: "mg",
				categories: ["mucolitico", "expectorante"]
			}
		],
		presentation: "syrup",
		categories: ["mucolitico", "expectorante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMOXICILINA + ACIDO CLAVULONICO",
		manufacturer: "Portugal",
		barcode: "7750215007204",
		altcode: [],
		dci: [
			{
				dciId: "Ko1vfYHpJL7x0yrhrc2m",
				name: "amoxicilina",
				measurement: 0,
				unit: "mg",
				categories: ["antibiotico"]
			},
			{
				dciId: "oQxGifZlcOhRcPt0vWR5",
				name: "acido clavulanico",
				measurement: 0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "syrup",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ESOSWIFT 40",
		manufacturer: "Thefar",
		barcode: "8904185601088",
		altcode: [],
		dci: [
			{
				dciId: "8Xc6jXBABj8J9XvwT997",
				name: "esomeprazol",
				measurement: 40.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "tablet",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ESOMEPRAZOL 40 MG",
		manufacturer: "Bonapharm",
		barcode: "8904242400265",
		altcode: [],
		dci: [
			{
				dciId: "8Xc6jXBABj8J9XvwT997",
				name: "esomeprazol",
				measurement: 40.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "tablet",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "XEROXZANIDA",
		manufacturer: "Tobal",
		barcode: "7759508000199",
		altcode: [],
		dci: [
			{
				dciId: "3GSK7AJbMdJJMcX2fKq8",
				name: "nitazoxanida",
				measurement: 500.0,
				unit: "mg",
				categories: ["antidiarreico", "antibacteriano", "antiparasitario"]
			}
		],
		presentation: "capsule",
		categories: ["antidiarreico", "antibacteriano", "antiparasitario"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NEUROFAST B12 20000",
		manufacturer: "Tobal",
		barcode: "7759508000915",
		altcode: [],
		dci: [
			{
				dciId: "rzJ9U647q8FYNZxLb0wt",
				name: "cianocobalamina",
				measurement: 20000.0,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "injection",
		categories: ["suplemento", "antianemico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LIVERFAST",
		manufacturer: "Tobal",
		barcode: "7759508000700",
		altcode: [],
		dci: [
			{
				dciId: "JNVpWHU65MdFh1m9kmzy",
				name: "desloratadina",
				measurement: 5.0,
				unit: "mg",
				categories: ["antihistaminico"]
			}
		],
		presentation: "tablet",
		categories: ["antihistaminico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "XEROXZANIDA 30 ML",
		manufacturer: "Tobal",
		barcode: "7759508000588",
		altcode: [],
		dci: [
			{
				dciId: "3GSK7AJbMdJJMcX2fKq8",
				name: "nitazoxanida",
				measurement: 100.0,
				unit: "mg",
				categories: ["antidiarreico", "antibacteriano", "antiparasitario"]
			}
		],
		presentation: "syrup",
		categories: ["antidiarreico", "antibacteriano", "antiparasitario"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NEOSIL SPRAY",
		manufacturer: "Tobal",
		barcode: "7759508000359",
		altcode: [],
		dci: [
			{
				dciId: "jNz9WvdhTibJW6J8M2mf",
				name: "terbinafina",
				measurement: 1.0,
				unit: "mg",
				categories: ["antimicotico"]
			}
		],
		presentation: "syrup",
		categories: ["antimicotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NEOSIL CREMA 15G",
		manufacturer: "Tobal",
		barcode: "7759508000083",
		altcode: [],
		dci: [
			{
				dciId: "jNz9WvdhTibJW6J8M2mf",
				name: "terbinafina",
				measurement: 1.0,
				unit: "mg",
				categories: ["antimicotico"]
			}
		],
		presentation: "cream",
		categories: ["antimicotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LUCIPRAL 40",
		manufacturer: "Tobal",
		barcode: "7759508000533",
		altcode: [],
		dci: [
			{
				dciId: "m8SJShGSnq9kKRvTyt7E",
				name: "pantoprazol",
				measurement: 40.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "tablet",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GENTAVAL 160",
		manufacturer: "Tobal",
		barcode: "7759508000816",
		altcode: [],
		dci: [
			{
				dciId: "MTbj4bXvKL86Dt5OYLf9",
				name: "gentamicina",
				measurement: 160.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "RAPICRESS",
		manufacturer: "Tobal",
		barcode: "7759508000755",
		altcode: [],
		dci: [
			{
				dciId: "0jZmZ4CIQr15mZ4QJUeZ",
				name: "minoxidil",
				measurement: 5.0,
				unit: "mg",
				categories: ["vasodilatador"]
			}
		],
		presentation: "syrup",
		categories: ["vasodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "RAPICRESS",
		manufacturer: "Tobal",
		barcode: "7759508000755",
		altcode: [],
		dci: [
			{
				dciId: "0jZmZ4CIQr15mZ4QJUeZ",
				name: "minoxidil",
				measurement: 5.0,
				unit: "mg",
				categories: ["vasodilatador"]
			}
		],
		presentation: "syrup",
		categories: ["vasodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TERBINAFINA 250 MG",
		manufacturer: "Labo Gen",
		barcode: "7752329001680",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HISTACLORF",
		manufacturer: "Sherfarma",
		barcode: "7751946003411",
		altcode: [],
		dci: [
			{
				dciId: "RloCDIz4cbOvpA3QTSBI",
				name: "clorfenamina",
				measurement: 4.0,
				unit: "mg",
				categories: ["antihistaminico", "antigripal"]
			}
		],
		presentation: "tablet",
		categories: ["antihistaminico", "antigripal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DIPHANATUR 500",
		manufacturer: "Diphasac",
		barcode: "8906141301827",
		altcode: [],
		dci: [
			{
				dciId: "roy32AbwyVJRe2wSRL1G",
				name: "silimarina",
				measurement: 500.0,
				unit: "mg",
				categories: ["hepatoprotector"]
			}
		],
		presentation: "capsule",
		categories: ["hepatoprotector"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PANADOL NIÑOS +2 AÑOS",
		manufacturer: "Haleon",
		barcode: "7451079003479",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 80.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MODISTEN RELAX",
		manufacturer: "Lyafarm",
		barcode: "0763331546158",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 300.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "QpmtNz4EVlj6P4qtr7eN",
				name: "orfenadrina",
				measurement: 250.0,
				unit: "mg",
				categories: ["relajante muscular", "analgesico"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "antipiretico", "relajante muscular"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ASPIRINA 100",
		manufacturer: "Bayer",
		barcode: "7753954002783",
		altcode: [],
		dci: [
			{
				dciId: "yb0pXftPfgUHgoQ2ZRpo",
				name: "acido acetilsalicilico",
				measurement: 100.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico", "antitrombotico", "antiinflamatorio"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "antipiretico", "antitrombotico", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ANDREWS TRIPLE ACCION",
		manufacturer: "Medifarma",
		barcode: "7759307000017",
		altcode: [],
		dci: [],
		presentation: "powder",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "COLPOTROPHINE",
		manufacturer: "Teva",
		barcode: "7759604723831",
		altcode: [],
		dci: [
			{
				dciId: "1NCsEelNKtBEVlma2lRW",
				name: "promestrieno",
				measurement: 10.0,
				unit: "mg",
				categories: ["hormonal"]
			}
		],
		presentation: "other",
		categories: ["hormonal"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SOMA B12- 1000",
		manufacturer: "Avanx Lab",
		barcode: "8904278592156",
		altcode: [],
		dci: [
			{
				dciId: "zHuvbnqIVNuKeE8ujOJO",
				name: "vitamina b12",
				measurement: 1000.0,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "tablet",
		categories: ["suplemento", "antianemico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ACIPRAL",
		manufacturer: "Intipharma",
		barcode: "7750288001116",
		altcode: [],
		dci: [
			{
				dciId: "9P8pX93iea6ptDb69Cbe",
				name: "omeprazol",
				measurement: 40.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "injection",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DEXA-4",
		manufacturer: "Intipharma",
		barcode: "7750288001420",
		altcode: [],
		dci: [
			{
				dciId: "4dSUIiPnJJe8ulOWNzcK",
				name: "dexametasona",
				measurement: 4.0,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "injection",
		categories: ["corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TOTOLAXX",
		manufacturer: "Sebalfarma",
		barcode: "7759405000292",
		altcode: [],
		dci: [
			{
				dciId: "9P5WsZUA0KxH9oNxZHwX",
				name: "bisacodilo",
				measurement: 5.0,
				unit: "mg",
				categories: ["laxante", "purgante"]
			}
		],
		presentation: "tablet",
		categories: ["laxante", "purgante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DONAFAN FORTE",
		manufacturer: "Ansolat",
		barcode: "7759050000692",
		altcode: [],
		dci: [
			{
				dciId: "dJou0056EErtm9UNj107",
				name: "loperamida",
				measurement: 2.0,
				unit: "mg",
				categories: ["antidiarreico"]
			}
		],
		presentation: "tablet",
		categories: ["antidiarreico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FLAVOXATO 200 MG",
		manufacturer: "Ajrlabs",
		barcode: "8904102205283",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMIKACINA 500MG/2ML",
		manufacturer: "Vitalis",
		barcode: "7707236124786",
		altcode: [],
		dci: [],
		presentation: "injection",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "COBAVIT-12",
		manufacturer: "Dany",
		barcode: "7750500001924",
		altcode: [],
		dci: [
			{
				dciId: "b4Qp1A6jUXN6mV4wJ6Hb",
				name: "hidroxocobalamina",
				measurement: 1.0,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "injection",
		categories: ["suplemento", "antianemico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HIDROXOCOBALAMINA 1M/ML",
		manufacturer: "Corporacion Fs",
		barcode: "7750453600243",
		altcode: [],
		dci: [],
		presentation: "injection",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NASTIZOL JUNIOR ANTIGRIPAL",
		manufacturer: "Bago",
		barcode: "7751495001760",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PROSTANSUL-HG",
		manufacturer: "Axier Group",
		barcode: "7750498720432",
		altcode: [],
		dci: [
			{
				dciId: "6vzqkcBmOytD2kUtfXYc",
				name: "tamsulosina",
				measurement: 0.4,
				unit: "mg",
				categories: ["urologico"]
			}
		],
		presentation: "capsule",
		categories: ["urologico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ENZO",
		manufacturer: "Thefar",
		barcode: "8904185600005",
		altcode: [],
		dci: [
			{
				dciId: "jaVlA2s09NGuTTYk3iZf",
				name: "enzima digestiva",
				measurement: 0,
				unit: "mg",
				categories: ["digestivo"]
			}
		],
		presentation: "capsule",
		categories: ["digestivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOLORGEZE",
		manufacturer: "Falab Peru",
		barcode: "7755570000075",
		altcode: [],
		dci: [
			{
				dciId: "IdOaEsvLo0eYKC8CAahY",
				name: "ketorolaco",
				measurement: 0,
				unit: "mg",
				categories: ["analgesico", "antiinflamatorio"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TEROCOX-120",
		manufacturer: "Falab Peru",
		barcode: "9449635486116",
		altcode: [],
		dci: [
			{
				dciId: "emvDdGQ7XQUkCjKi3EqL",
				name: "etoricoxib",
				measurement: 120.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "tablet",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLINBACT-D 600MG/4ML",
		manufacturer: "Dany",
		barcode: "7753803001011",
		altcode: [],
		dci: [
			{
				dciId: "PVaGA5iKgqkawUubTUg2",
				name: "clindamicina",
				measurement: 0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BETARTRIX",
		manufacturer: "Dany",
		barcode: "7750500001719",
		altcode: [],
		dci: [
			{
				dciId: "zQpfrpNBtJGg5mYHI0ro",
				name: "betametasona",
				measurement: 4.0,
				unit: "mg",
				categories: ["corticoide", "antiinflamatorio"]
			}
		],
		presentation: "injection",
		categories: ["corticoide", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TAMSULOSINA 0.4 MG",
		manufacturer: "Bonapharm",
		barcode: "8904242400258",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TAMSULOSINA 0.4 MG",
		manufacturer: "Ajrlabs",
		barcode: "8906101924653",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ALLERSTAT 180",
		manufacturer: "Ajrlabs",
		barcode: "8901149049016",
		altcode: [],
		dci: [
			{
				dciId: "dZaZY9eAT6emYozrIJCl",
				name: "fexofenadina",
				measurement: 180.0,
				unit: "mg",
				categories: ["antihistaminico"]
			}
		],
		presentation: "tablet",
		categories: ["antihistaminico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DIGESAN",
		manufacturer: "Intipharma",
		barcode: "7750288001505",
		altcode: [],
		dci: [
			{
				dciId: "jaVlA2s09NGuTTYk3iZf",
				name: "enzima digestiva",
				measurement: 0,
				unit: "mg",
				categories: ["digestivo"]
			}
		],
		presentation: "capsule",
		categories: ["digestivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NOVITEL DHA",
		manufacturer: "Intipharma",
		barcode: "8936218619012",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PREGABALINA 75MG",
		manufacturer: "Seven Pharma",
		barcode: "8903726255711",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ORAMIN-F",
		manufacturer: "Daewon",
		barcode: "8806718022615",
		altcode: [],
		dci: [
			{
				dciId: "qMJWMuu1PzZLvlVWfvWO",
				name: "ginseng",
				measurement: 0,
				unit: "mg",
				categories: ["suplemento", "estimulador"]
			}
		],
		presentation: "capsule",
		categories: ["suplemento", "estimulador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMOXICILINA + ACIDO CLAVULONICO 250MG",
		manufacturer: "Portugal",
		barcode: "7750215007204",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMOXICILINA 250MG",
		manufacturer: "Portugal",
		barcode: "7750215004685",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLORFENAMINA MALEATO 2MG",
		manufacturer: "Portugal",
		barcode: "7750215728246",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLORFENAMINA MALEATO 2MG",
		manufacturer: "Portugal",
		barcode: "7750215728246",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DEXTROMETORFANO 15MG",
		manufacturer: "Portugal",
		barcode: "7750215074305",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "IBUPROFENO 100MG",
		manufacturer: "Portugal",
		barcode: "7750215728222",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SULFAMETOXAZOL + TRIMETROPINA 200MG/400MG",
		manufacturer: "Portugal",
		barcode: "7750215362754",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "METRONIDAZOL 250 MG",
		manufacturer: "Portugal",
		barcode: "7750215796573",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMPICILINA 500 MG",
		manufacturer: "Portugal",
		barcode: "7750215005767",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMLODIPINO 10 MG",
		manufacturer: "Portugal",
		barcode: "7750215007822",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CAPTOPRIL 25 MG",
		manufacturer: "Portugal",
		barcode: "7750215000632",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PREDNISONA 20 MG",
		manufacturer: "Portugal",
		barcode: "7750215005699",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PREDNISONA 20 MG",
		manufacturer: "Portugal",
		barcode: "7750215005699",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PREDNISONA 5 MG",
		manufacturer: "Portugal",
		barcode: "7750215003770",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ENALAPRIL 20 MG",
		manufacturer: "Portugal",
		barcode: "7750215003756",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMLODIPINO 5 MG",
		manufacturer: "Portugal",
		barcode: "7750215007815",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "OMEPRAZOL 20 MG",
		manufacturer: "Portugal",
		barcode: "7750215004487",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CETIRIZINA 10 MG",
		manufacturer: "Portugal",
		barcode: "7750215002384",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICLOXACILINA 500 MG",
		manufacturer: "Portugal",
		barcode: "7750215004722",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICLOFENACO 100 MG",
		manufacturer: "Portugal",
		barcode: "7750215027219",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ACIDO FOLICO 0.5 MG",
		manufacturer: "Portugal",
		barcode: "7750215001844",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ATORVASTATINA 10 MG",
		manufacturer: "Portugal",
		barcode: "7750215030240",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DIMENHIDRINATO 50 MG",
		manufacturer: "Portugal",
		barcode: "7750215005866",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HEPALIVIO B",
		manufacturer: "Portugal",
		barcode: "7750215008874",
		altcode: [],
		dci: [
			{
				dciId: "roy32AbwyVJRe2wSRL1G",
				name: "silimarina",
				measurement: 150.0,
				unit: "mg",
				categories: ["hepatoprotector"]
			},
			{
				dciId: "annZAxNbWZaOGgEJoFZK",
				name: "vitaminas",
				measurement: 0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "tablet",
		categories: ["hepatoprotector", "suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TETRACICLINA 500 MG",
		manufacturer: "Portugal",
		barcode: "7750215432969",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLOTRIMAZOL 1%",
		manufacturer: "Portugal",
		barcode: "7750215136249",
		altcode: [],
		dci: [],
		presentation: "cream",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BETAMETASONA 0,05%",
		manufacturer: "Portugal",
		barcode: "7750215023396",
		altcode: [],
		dci: [],
		presentation: "cream",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BETAMETASONA 0,05%",
		manufacturer: "Portugal",
		barcode: "7750215023396",
		altcode: [],
		dci: [],
		presentation: "cream",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICLOFENACO 1%",
		manufacturer: "Portugal",
		barcode: "7750215005675",
		altcode: [],
		dci: [],
		presentation: "cream",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ACICLOVIR 5%",
		manufacturer: "Portugal",
		barcode: "7750215001905",
		altcode: [],
		dci: [],
		presentation: "cream",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "VIOLETA DE GENCIANA 30 ML",
		manufacturer: "Portugal",
		barcode: "7750215103692",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ACIDO FOLICO 0.5 MG",
		manufacturer: "Portugal",
		barcode: "7750215001844",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ACIDO FOLICO 0.5 MG",
		manufacturer: "Portugal",
		barcode: "7750215001844",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMOXICILINA 500 MG",
		manufacturer: "Portugal",
		barcode: "7750215022924",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLINDAMICINA 300 MG",
		manufacturer: "Portugal",
		barcode: "7750215962480",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLARITROMICINA 500 MG",
		manufacturer: "Portugal",
		barcode: "7750215004593",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ALIVIOLITO",
		manufacturer: "Cienpharma",
		barcode: "7757468000235",
		altcode: [],
		dci: [
			{
				dciId: "VIWeU9GfL4D1AmYXOTdQ",
				name: "ibuprofeno",
				measurement: 100.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antipiretico"]
			}
		],
		presentation: "syrup",
		categories: ["antiinflamatorio", "analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "XOLTEROL ADULTO",
		manufacturer: "Cienpharma",
		barcode: "7757468000211",
		altcode: [],
		dci: [
			{
				dciId: "wJRnkM3trj8zfMgkZXAy",
				name: "ambroxol",
				measurement: 15.0,
				unit: "mg",
				categories: ["mucolitico", "expectorante"]
			},
			{
				dciId: "nsvQNUgBVLNGfZ9AP3xa",
				name: "clenbuterol",
				measurement: 0.01,
				unit: "mg",
				categories: ["asma", "broncodilatador"]
			}
		],
		presentation: "syrup",
		categories: ["mucolitico", "expectorante", "asma", "broncodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "XOLTEROL ADULTO",
		manufacturer: "Cienpharma",
		barcode: "7757468000006",
		altcode: [],
		dci: [
			{
				dciId: "wJRnkM3trj8zfMgkZXAy",
				name: "ambroxol",
				measurement: 15.0,
				unit: "mg",
				categories: ["mucolitico", "expectorante"]
			},
			{
				dciId: "nsvQNUgBVLNGfZ9AP3xa",
				name: "clenbuterol",
				measurement: 0.01,
				unit: "mg",
				categories: ["asma", "broncodilatador"]
			}
		],
		presentation: "syrup",
		categories: ["mucolitico", "expectorante", "asma", "broncodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ZITROCIEN",
		manufacturer: "Cienpharma",
		barcode: "7757468000273",
		altcode: [],
		dci: [
			{
				dciId: "DUKZh08nujtm5AAakXaR",
				name: "azitromicina",
				measurement: 200.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "syrup",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ALBENDAZOL 100MG",
		manufacturer: "Farmindustria",
		barcode: "7750304132312",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ALPRAZOLAM 0.5MG",
		manufacturer: "Farmindustria",
		barcode: "7750304011037",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CAPTOPRIL 25 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304106139",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLINDAMICINA 300 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304007238",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DEXAMETASONA 4 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304005531",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ENALAPRIL 20 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304309967",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ENALAPRIL 10 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304806602",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FENAZOPIRIDINA 100 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304002653",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GENTAMICINA 160 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304005951",
		altcode: [],
		dci: [],
		presentation: "injection",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GLIBENCLAMIDA 5 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304052221",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "KETOROLACO 10 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304009676",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LACTULOSA 3.33G/5ML",
		manufacturer: "Farmindustria",
		barcode: "7750304987189",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LORATADINA 10MG",
		manufacturer: "Farmindustria",
		barcode: "",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "ORFENADRINA CITRATO 100 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304002349",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PARACETAMOL 500 MG",
		manufacturer: "Farmindustria",
		barcode: "7750304000123",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICLOFENACO 100 MG",
		manufacturer: "Portugal",
		barcode: "7750215027219",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NAPROXENO SODICO 550 MG",
		manufacturer: "Portugal",
		barcode: "7750215028421",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CLORANFENICOL 500 MG",
		manufacturer: "Portugal",
		barcode: "7750215331354",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DEXAMETASONA 4 MG",
		manufacturer: "Portugal",
		barcode: "7750215026502",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LOPERAMIDA 2 MG",
		manufacturer: "Portugal",
		barcode: "7750215005873",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CIPROFLOXACINO 500 MG",
		manufacturer: "Portugal",
		barcode: "7750215496855",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "METFORMINA CLORHIDRATO 850 MG",
		manufacturer: "Portugal",
		barcode: "7750215007839",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "METFORMINA CLORHIDRATO 850 MG",
		manufacturer: "Portugal",
		barcode: "7750215007839",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SULFAMETOXAZOL + TRIMETROPINA 800MG/160MG",
		manufacturer: "Portugal",
		barcode: "7750215962473",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SULFAMETOXAZOL + TRIMETROPINA 800MG/160MG",
		manufacturer: "Portugal",
		barcode: "7750215962473",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FLUCONAZOL 150 MG",
		manufacturer: "Portugal",
		barcode: "7750215432976",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "METRONIDAZOL 500 MG",
		manufacturer: "Portugal",
		barcode: "7750215332641",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MICROGYNON GRAGEAS",
		manufacturer: "Portugal",
		barcode: "7896006223627",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NITRATO DE PLATA 50%",
		manufacturer: "Portugal",
		barcode: "7750215054017",
		altcode: [],
		dci: [],
		presentation: "other",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "B-NEUROFLAX",
		manufacturer: "Markos",
		barcode: "7751207003235",
		altcode: [],
		dci: [
			{
				dciId: "mu7ghwVbCXzhZ8qwbJLI",
				name: "vitamina c",
				measurement: 0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "injection",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DOLOPARAMIDOL NF",
		manufacturer: "Markos",
		barcode: "7751207002597",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 500.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "VIWeU9GfL4D1AmYXOTdQ",
				name: "ibuprofeno",
				measurement: 150.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antipiretico"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "antipiretico", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CIPROMAX 500 MG",
		manufacturer: "Markos",
		barcode: "7751207001545",
		altcode: [],
		dci: [
			{
				dciId: "SBz1dwHoShyROcq3WIOC",
				name: "ciprofloxacino",
				measurement: 0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PARAMIDOL 1000",
		manufacturer: "Markos",
		barcode: "7751207002818",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 1.0,
				unit: "g",
				categories: ["analgesico", "antipiretico"]
			}
		],
		presentation: "other",
		categories: ["analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "UROMAX",
		manufacturer: "Markos",
		barcode: "7751207003334",
		altcode: [],
		dci: [
			{
				dciId: "uXlo6wAGwg8tYOUefpUV",
				name: "fenazopiridina",
				measurement: 100.0,
				unit: "mg",
				categories: ["analgesico", "urologico"]
			}
		],
		presentation: "other",
		categories: ["analgesico", "urologico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "UROTAN-D",
		manufacturer: "Markos",
		barcode: "7751207002948",
		altcode: [],
		dci: [
			{
				dciId: "uXlo6wAGwg8tYOUefpUV",
				name: "fenazopiridina",
				measurement: 100.0,
				unit: "mg",
				categories: ["analgesico", "urologico"]
			}
		],
		presentation: "tablet",
		categories: ["analgesico", "urologico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PAVERYL",
		manufacturer: "Markos",
		barcode: "7751207002856",
		altcode: [],
		dci: [
			{
				dciId: "lws6OvkmJ13Sunh8f4Bs",
				name: "clorhidrato papaverina",
				measurement: 30.0,
				unit: "mg",
				categories: ["antiespasmodico"]
			}
		],
		presentation: "injection",
		categories: ["antiespasmodico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MYSTOL",
		manufacturer: "Markos",
		barcode: "7751207001057",
		altcode: [],
		dci: [
			{
				dciId: "WswJSttQA1hyUFyfNaIL",
				name: "misoprostol",
				measurement: 200.0,
				unit: "mg",
				categories: ["gastritis"]
			}
		],
		presentation: "tablet",
		categories: ["gastritis"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "UROBAC",
		manufacturer: "Markos",
		barcode: "7751207002658",
		altcode: [],
		dci: [
			{
				dciId: "SBz1dwHoShyROcq3WIOC",
				name: "ciprofloxacino",
				measurement: 500.0,
				unit: "mg",
				categories: ["antibiotico"]
			}
		],
		presentation: "tablet",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "VENUX",
		manufacturer: "Markos",
		barcode: "7751207001033",
		altcode: [],
		dci: [
			{
				dciId: "fpzlB1jimywmAJr7wGWW",
				name: "sildenafilo",
				measurement: 100.0,
				unit: "mg",
				categories: ["vasodilatador"]
			}
		],
		presentation: "tablet",
		categories: ["vasodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "VENUX",
		manufacturer: "Markos",
		barcode: "7751207001026",
		altcode: [],
		dci: [
			{
				dciId: "fpzlB1jimywmAJr7wGWW",
				name: "sildenafilo",
				measurement: 50.0,
				unit: "mg",
				categories: ["vasodilatador"]
			}
		],
		presentation: "tablet",
		categories: ["vasodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "BRONCODEX COMPUESTO 120ML",
		manufacturer: "Markos",
		barcode: "7751207057214",
		altcode: [],
		dci: [
			{
				dciId: "wJRnkM3trj8zfMgkZXAy",
				name: "ambroxol",
				measurement: 0,
				unit: "mg",
				categories: ["mucolitico", "expectorante"]
			},
			{
				dciId: "nsvQNUgBVLNGfZ9AP3xa",
				name: "clenbuterol",
				measurement: 0,
				unit: "mg",
				categories: ["asma", "broncodilatador"]
			}
		],
		presentation: "syrup",
		categories: ["mucolitico", "expectorante", "asma", "broncodilatador"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CORTAFAN NF",
		manufacturer: "Markos",
		barcode: "7751207001699",
		altcode: [],
		dci: [
			{
				dciId: "4fMbYykDLht9pXAKzg58",
				name: "nifuroxazida",
				measurement: 200.0,
				unit: "mg",
				categories: ["antidiarreico", "antibacteriano"]
			}
		],
		presentation: "capsule",
		categories: ["antidiarreico", "antibacteriano"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PROSTAL",
		manufacturer: "Markos",
		barcode: "7751207000197",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CORTAFAN FORTE",
		manufacturer: "Markos",
		barcode: "7751207002849",
		altcode: [],
		dci: [
			{
				dciId: "4fMbYykDLht9pXAKzg58",
				name: "nifuroxazida",
				measurement: 220.0,
				unit: "mg",
				categories: ["antidiarreico", "antibacteriano"]
			}
		],
		presentation: "syrup",
		categories: ["antidiarreico", "antibacteriano"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GRIPALERT",
		manufacturer: "Markos",
		barcode: "7751207003198",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 250.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "QUgfb8goNWTNUepiUHTu",
				name: "dextrometorfano",
				measurement: 10.0,
				unit: "mg",
				categories: ["antigripal"]
			},
			{
				dciId: "83VNMNAm5xVTNHu5FEN7",
				name: "pseudoefedrina",
				measurement: 300.0,
				unit: "mg",
				categories: ["descongestionante", "antigripal"]
			}
		],
		presentation: "syrup",
		categories: ["analgesico", "antipiretico", "antigripal", "descongestionante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MAGACID",
		manufacturer: "Markos",
		barcode: "7751207002931",
		altcode: [],
		dci: [
			{
				dciId: "HX23yzFxITbJGWZtSqAU",
				name: "magaldrato",
				measurement: 400.0,
				unit: "mg",
				categories: ["antiacido"]
			},
			{
				dciId: "Q5fCtw9yM4sRtn6qC6W4",
				name: "simeticona",
				measurement: 30.0,
				unit: "mg",
				categories: ["antiflatulento"]
			}
		],
		presentation: "syrup",
		categories: ["antiacido", "antiflatulento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MAGACID",
		manufacturer: "Markos",
		barcode: "7751207002931",
		altcode: [],
		dci: [
			{
				dciId: "HX23yzFxITbJGWZtSqAU",
				name: "magaldrato",
				measurement: 400.0,
				unit: "mg",
				categories: ["antiacido"]
			},
			{
				dciId: "Q5fCtw9yM4sRtn6qC6W4",
				name: "simeticona",
				measurement: 30.0,
				unit: "mg",
				categories: ["antiflatulento"]
			}
		],
		presentation: "syrup",
		categories: ["antiacido", "antiflatulento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MALDEX 120ML",
		manufacturer: "Markos",
		barcode: "7751207002610",
		altcode: [],
		dci: [],
		presentation: "syrup",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TANDERIL",
		manufacturer: "Markos",
		barcode: "7751207002412",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "capsule",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "HEMOCYTON 340 ML",
		manufacturer: "Markos",
		barcode: "7751207002887",
		altcode: [],
		dci: [
			{
				dciId: "annZAxNbWZaOGgEJoFZK",
				name: "vitaminas",
				measurement: 0,
				unit: "mg",
				categories: ["suplemento"]
			}
		],
		presentation: "syrup",
		categories: ["suplemento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "NEUROFOR 5000 TRIPLE",
		manufacturer: "Markos",
		barcode: "7751207002504",
		altcode: [],
		dci: [
			{
				dciId: "4PME6zquptIa0F1d2SVL",
				name: "tiamina",
				measurement: 100.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "MzDoli6CvMArEyfd91Vm",
				name: "piridoxina",
				measurement: 100.0,
				unit: "mg",
				categories: ["suplemento"]
			},
			{
				dciId: "rzJ9U647q8FYNZxLb0wt",
				name: "cianocobalamina",
				measurement: 500.0,
				unit: "mg",
				categories: ["suplemento", "antianemico"]
			}
		],
		presentation: "injection",
		categories: ["suplemento", "antianemico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "CEFTREX",
		manufacturer: "Markos",
		barcode: "7751207002511",
		altcode: [],
		dci: [
			{
				dciId: "gAaSpB7f6M7XkY1pXccj",
				name: "ceftriaxona",
				measurement: 1.0,
				unit: "g",
				categories: ["antibiotico"]
			}
		],
		presentation: "injection",
		categories: ["antibiotico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LAXOVEN 240 ML",
		manufacturer: "Markos",
		barcode: "7751207002245",
		altcode: [],
		dci: [
			{
				dciId: "urAbmV2qKrpFoaEHZF6E",
				name: "picosulfato sodio",
				measurement: 0,
				unit: "mg",
				categories: ["laxante", "purgante"]
			}
		],
		presentation: "other",
		categories: ["laxante", "purgante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LAXOVEN 120 ML",
		manufacturer: "Markos",
		barcode: "7751207002238",
		altcode: [],
		dci: [
			{
				dciId: "urAbmV2qKrpFoaEHZF6E",
				name: "picosulfato sodio",
				measurement: 0,
				unit: "mg",
				categories: ["laxante", "purgante"]
			}
		],
		presentation: "other",
		categories: ["laxante", "purgante"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "MAGACID",
		manufacturer: "Markos",
		barcode: "7751207003013",
		altcode: [],
		dci: [
			{
				dciId: "HX23yzFxITbJGWZtSqAU",
				name: "magaldrato",
				measurement: 800.0,
				unit: "mg",
				categories: ["antiacido"]
			},
			{
				dciId: "Q5fCtw9yM4sRtn6qC6W4",
				name: "simeticona",
				measurement: 40.0,
				unit: "mg",
				categories: ["antiflatulento"]
			}
		],
		presentation: "tablet",
		categories: ["antiacido", "antiflatulento"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FLEXEN PLUS",
		manufacturer: "Markos",
		barcode: "7751207002436",
		altcode: [],
		dci: [
			{
				dciId: "QpmtNz4EVlj6P4qtr7eN",
				name: "orfenadrina",
				measurement: 35.0,
				unit: "mg",
				categories: ["relajante muscular", "analgesico"]
			},
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 450.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			}
		],
		presentation: "other",
		categories: ["relajante muscular", "analgesico", "antipiretico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TANDERIL SR",
		manufacturer: "Markos",
		barcode: "7751207001934",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 100.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "tablet",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TANDERIL",
		manufacturer: "Markos",
		barcode: "7751207002412",
		altcode: [],
		dci: [
			{
				dciId: "gaUpUCgDjNLYi9GS9hnU",
				name: "diclofenaco",
				measurement: 50.0,
				unit: "mg",
				categories: ["antiinflamatorio", "analgesico", "antirreumatico"]
			}
		],
		presentation: "capsule",
		categories: ["antiinflamatorio", "analgesico", "antirreumatico"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DIOSMIN H 500MG",
		manufacturer: "Markos",
		barcode: "7751207001064",
		altcode: [],
		dci: [],
		presentation: "other",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LINDIOL 1",
		manufacturer: "Markos",
		barcode: "7751207001972",
		altcode: [],
		dci: [
			{
				dciId: "dy6ucMmyuZfNIUNr20Mx",
				name: "levonorgestrel",
				measurement: 1.5,
				unit: "mg",
				categories: ["anticonceptivo"]
			}
		],
		presentation: "other",
		categories: ["anticonceptivo"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "AMIGDAZOL B",
		manufacturer: "Markos",
		barcode: "7751207001781",
		altcode: [],
		dci: [
			{
				dciId: "w5sdRRR3iw4aETQEWTiK",
				name: "bencidamina",
				measurement: 0.15,
				unit: "mg",
				categories: ["analgesico", "antiinflamatorio"]
			}
		],
		presentation: "other",
		categories: ["analgesico", "antiinflamatorio"],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "PARAMIDOL MIGRAÑA",
		manufacturer: "Markos",
		barcode: "7751207001767",
		altcode: [],
		dci: [
			{
				dciId: "RoDa9zqNGqOJw021HFQT",
				name: "paracetamol",
				measurement: 250.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico"]
			},
			{
				dciId: "yb0pXftPfgUHgoQ2ZRpo",
				name: "acido acetilsalicilico",
				measurement: 250.0,
				unit: "mg",
				categories: ["analgesico", "antipiretico", "antitrombotico", "antiinflamatorio"]
			},
			{
				dciId: "POr4z4DdPpKilPOibID6",
				name: "cafeina",
				measurement: 65.0,
				unit: "mg",
				categories: ["analgesico", "estimulador"]
			}
		],
		presentation: "tablet",
		categories: [
			"analgesico",
			"antipiretico",
			"antitrombotico",
			"antiinflamatorio",
			"estimulador"
		],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICLOFENACO GEL 1%",
		manufacturer: "Genfar",
		barcode: "7702605150762",
		altcode: [],
		dci: [],
		presentation: "cream",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "LINCOMICINA 600MG/2ML",
		manufacturer: "Genfar",
		barcode: "7702605151400",
		altcode: [],
		dci: [],
		presentation: "injection",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "FUROSEMIDA 40MG",
		manufacturer: "Genfar",
		barcode: "7702605151004",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "DICLOXACILINA 500 MG",
		manufacturer: "Genfar",
		barcode: "7702605150793",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "GEMFIBROZILO 600MG",
		manufacturer: "Genfar",
		barcode: "7702605151035",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "METRONIDAZOL 500MG",
		manufacturer: "Genfar",
		barcode: "77026051509",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "SECNIDAZOL 500 MG",
		manufacturer: "Genfar",
		barcode: "7702605151851",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TRAMADOL 50MG",
		manufacturer: "Genfar",
		barcode: "7702605152087",
		altcode: [],
		dci: [],
		presentation: "capsule",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "TRAMADOL 100MG/2ML",
		manufacturer: "Genfar",
		barcode: "7702605337774",
		altcode: [],
		dci: [],
		presentation: "injection",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "KETOPROFENO 100MG",
		manufacturer: "Genfar",
		barcode: "7702605151301",
		altcode: [],
		dci: [],
		presentation: "tablet",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	},
	{
		brand: "KETOROLACO 30 MG/ML",
		manufacturer: "Genfar",
		barcode: "7702605151356",
		altcode: [],
		dci: [],
		presentation: "injection",
		categories: [],
		minStock: 10,
		dataSource: "manual",
		isActive: true,
		requiredPrescription: false
	}
] as const
