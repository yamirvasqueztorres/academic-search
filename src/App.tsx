import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Input,
  Badge,
  Icon,
  HStack,
  VStack,
  Link,
  Separator,
  Container,
} from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"
import { InputGroup } from "@/components/ui/input-group"
import {
  LuSearch,
  LuExternalLink,
  LuBookOpen,
  LuAtom,
  LuGlobe,
  LuFilter,
  LuLayoutGrid,
  LuList,
} from "react-icons/lu"
import { useState, useMemo } from "react"

interface Platform {
  name: string
  url: string
  category: string
  description: string
}

const PLATFORMS: Platform[] = [
  { name: "TXYZ", url: "https://app.txyz.ai", category: "IA", description: "Búsqueda académica con IA" },
  { name: "SciSpace", url: "https://scispace.com", category: "IA", description: "Lectura y análisis de papers con IA" },
  { name: "MDPI", url: "https://www.mdpi.com", category: "Open Access", description: "Editorial de acceso abierto" },
  { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov", category: "Biomedicina", description: "Literatura biomédica del NCBI" },
  { name: "ScienceDirect", url: "https://www.sciencedirect.com", category: "Multidisciplinar", description: "Base de datos Elsevier" },
  { name: "Taylor & Francis Online", url: "https://www.tandfonline.com", category: "Multidisciplinar", description: "Revistas académicas T&F" },
  { name: "ACM Digital Library", url: "https://dl.acm.org", category: "Informática", description: "Literatura en computación y TI" },
  { name: "Research Rabbit", url: "https://app.researchrabbit.ai", category: "IA", description: "Mapa visual de literatura científica" },
  { name: "DOAJ", url: "https://doaj.org", category: "Open Access", description: "Directorio de revistas de acceso abierto" },
  { name: "Google Libros", url: "https://books.google.com", category: "Multidisciplinar", description: "Búsqueda de libros digitalizados" },
  { name: "Google Académico", url: "https://scholar.google.com", category: "Multidisciplinar", description: "Motor de búsqueda académica de Google" },
  { name: "Biblioteca CONCYTEC", url: "https://alicia.concytec.gob.pe/", category: "Latinoamérica", description: "Repositorio peruano ALICIA" },
  { name: "Renati", url: "https://renati.sunedu.gob.pe", category: "Latinoamérica", description: "Repositorio nacional de tesis Perú" },
  { name: "Crossref", url: "https://www.crossref.org", category: "Metadatos", description: "Registro oficial de DOIs" },
  { name: "Repositorio Institucional CONCYTEC", url: "https://repositorio.concytec.gob.pe", category: "Latinoamérica", description: "Repositorio científico peruano" },
  { name: "LA Referencia", url: "https://www.lareferencia.info", category: "Latinoamérica", description: "Red de repositorios latinoamericanos" },
  { name: "Semantic Scholar", url: "https://www.semanticscholar.org", category: "IA", description: "Búsqueda semántica de papers" },
  { name: "Scilit", url: "https://www.scilit.com", category: "Open Access", description: "Literatura científica de acceso abierto" },
  { name: "Research4Life", url: "https://www.research4life.org/search/", category: "Open Access", description: "Acceso a recursos para países en desarrollo" },
  { name: "Jisc", url: "https://www.jisc.ac.uk", category: "Infraestructura", description: "Servicios digitales para educación UK" },
  { name: "SSRN", url: "https://www.ssrn.com", category: "Preprints", description: "Repositorio de preprints sociales" },
  { name: "OpenAlex", url: "https://openalex.org", category: "Open Access", description: "Índice abierto de literatura académica" },
  { name: "IEEE Xplore", url: "https://ieeexplore.ieee.org/Xplore/home.jsp", category: "Ingeniería", description: "Literatura IEEE en ingeniería y TI" },
  { name: "SpringerLink", url: "https://link.springer.com", category: "Multidisciplinar", description: "Publicaciones académicas Springer" },
  { name: "Wiley Online Library", url: "https://onlinelibrary.wiley.com", category: "Multidisciplinar", description: "Revistas y libros académicos Wiley" },
  { name: "Nature Portfolio", url: "https://www.nature.com", category: "Ciencias Naturales", description: "Grupo editorial Nature" },
  { name: "Science (AAAS)", url: "https://www.science.org", category: "Ciencias Naturales", description: "Revista Science y publicaciones AAAS" },
  { name: "SAGE Journals", url: "https://journals.sagepub.com", category: "Ciencias Sociales", description: "Revistas SAGE en ciencias sociales" },
  { name: "Oxford Academic", url: "https://academic.oup.com", category: "Multidisciplinar", description: "Publicaciones Oxford University Press" },
  { name: "Cambridge Core", url: "https://www.cambridge.org/core", category: "Multidisciplinar", description: "Publicaciones Cambridge University Press" },
  { name: "ASME Digital Collection", url: "https://asmedigitalcollection.asme.org", category: "Ingeniería", description: "Literatura ASME en ingeniería mecánica" },
  { name: "SAE MOBILUS", url: "https://saemobilus.sae.org", category: "Ingeniería", description: "Literatura SAE en automoción e ingeniería" },
  { name: "Knovel", url: "https://app.knovel.com/kn/search", category: "Ingeniería", description: "Base de datos técnica de ingeniería" },
  { name: "Cochrane Library", url: "https://www.cochranelibrary.com", category: "Biomedicina", description: "Revisiones sistemáticas en salud" },
  { name: "ClinicalKey", url: "https://www.clinicalkey.com", category: "Biomedicina", description: "Recursos clínicos Elsevier" },
  { name: "UpToDate", url: "https://www.uptodate.com/contents/search", category: "Biomedicina", description: "Decisiones clínicas basadas en evidencia" },
  { name: "MEDLINE", url: "https://www.nlm.nih.gov/medline", category: "Biomedicina", description: "Base de datos biomédica NLM" },
  { name: "JSTOR", url: "https://www.jstor.org", category: "Humanidades", description: "Archivo de revistas académicas" },
  { name: "EconLit", url: "https://www.aeaweb.org/search", category: "Economía", description: "Literatura económica AEA" },
  { name: "ProQuest", url: "https://www.proquest.com", category: "Multidisciplinar", description: "Plataforma de bases de datos ProQuest" },
  { name: "Emerald Insight", url: "https://www.emerald.com/insight", category: "Ciencias Sociales", description: "Publicaciones en gestión y negocios" },
  { name: "arXiv", url: "https://arxiv.org", category: "Preprints", description: "Preprints en física, matemáticas y cs" },
  { name: "bioRxiv", url: "https://www.biorxiv.org", category: "Preprints", description: "Preprints en ciencias biológicas" },
  { name: "medRxiv", url: "https://www.medrxiv.org", category: "Preprints", description: "Preprints en ciencias de la salud" },
  { name: "Zenodo", url: "https://zenodo.org", category: "Repositorio", description: "Repositorio de investigación CERN" },
  { name: "Figshare", url: "https://figshare.com/search", category: "Repositorio", description: "Plataforma para compartir datos de investigación" },
  { name: "Dryad", url: "https://datadryad.org", category: "Repositorio", description: "Repositorio de datos de investigación" },
  { name: "Consensus", url: "https://consensus.app", category: "IA", description: "Respuestas basadas en papers científicos" },
  { name: "Elicit", url: "https://elicit.com", category: "IA", description: "Asistente de revisión de literatura con IA" },
  { name: "Connected Papers", url: "https://www.connectedpapers.com", category: "IA", description: "Grafo visual de papers relacionados" },
  { name: "Litmaps", url: "https://www.litmaps.com", category: "IA", description: "Mapa interactivo de literatura científica" },
  { name: "Inciteful", url: "https://inciteful.xyz", category: "IA", description: "Red de citas para descubrir papers" },
  { name: "BASE", url: "https://www.base-search.net", category: "Metadatos", description: "Motor de búsqueda académica Bielefeld" },
  { name: "CORE", url: "https://core.ac.uk", category: "Open Access", description: "Acceso a papers de acceso abierto" },
  { name: "Europe PMC", url: "https://europepmc.org", category: "Biomedicina", description: "Literatura biomédica europea" },
  { name: "OpenAIRE Explore", url: "https://explore.openaire.eu", category: "Open Access", description: "Infraestructura europea de investigación abierta" },
  { name: "OpenDOAR", url: "https://v2.sherpa.ac.uk/opendoar", category: "Repositorio", description: "Directorio de repositorios de acceso abierto" },
  { name: "OSF Preprints", url: "https://osf.io/preprints", category: "Preprints", description: "Preprints del Open Science Framework" },
  { name: "Open Research Library", url: "https://openresearchlibrary.org", category: "Open Access", description: "Biblioteca de investigación abierta" },
  { name: "ERIC", url: "https://eric.ed.gov", category: "Educación", description: "Literatura en ciencias de la educación" },
  { name: "AGRIS", url: "https://agris.fao.org", category: "Agrociencias", description: "Literatura agrícola FAO" },
  { name: "SSRN First Look (preprints)", url: "https://www.ssrn.com", category: "Preprints", description: "Preprints en ciencias sociales" },
  { name: "HAL", url: "https://hal.science", category: "Open Access", description: "Archivo abierto francés de investigación" },
  { name: "SciELO", url: "https://scielo.org", category: "Latinoamérica", description: "Biblioteca científica electrónica latinoamericana" },
  { name: "REDIB", url: "https://www.redib.org", category: "Latinoamérica", description: "Red iberoamericana de innovación" },
  { name: "Scopus", url: "https://www.scopus.com/", category: "Multidisciplinar", description: "Base de datos bibliográfica Elsevier" },
  { name: "Web of Science", url: "https://www.webofscience.com/", category: "Multidisciplinar", description: "Índice de citas Clarivate" },
  { name: "IOP Science", url: "https://iopscience.iop.org/", category: "Física", description: "Publicaciones en física y ciencias" },
  { name: "EBSCOhost", url: "https://www.ebsco.com/products/ebscohost-research-platform", category: "Multidisciplinar", description: "Plataforma de bases de datos EBSCO" },
  { name: "Redalyc", url: "https://www.redalyc.org", category: "Latinoamérica", description: "Red de revistas científicas latinoamericanas" },
]

const CATEGORY_COLORS: Record<string, string> = {
  "IA": "purple",
  "Open Access": "green",
  "Biomedicina": "red",
  "Multidisciplinar": "blue",
  "Latinoamérica": "orange",
  "Preprints": "yellow",
  "Ingeniería": "cyan",
  "Informática": "teal",
  "Metadatos": "gray",
  "Repositorio": "pink",
  "Humanidades": "orange",
  "Economía": "green",
  "Ciencias Sociales": "purple",
  "Ciencias Naturales": "teal",
  "Educación": "blue",
  "Agrociencias": "green",
  "Física": "cyan",
  "Infraestructura": "gray",
}

const ALL_CATEGORIES = ["Todos", ...Array.from(new Set(PLATFORMS.map(p => p.category))).sort()]

export default function App() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filtered = useMemo(() => {
    return PLATFORMS.filter(p => {
      const matchesQuery =
        query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = activeCategory === "Todos" || p.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [query, activeCategory])

  return (
    <Box bg="bg" minH="100vh">
      {/* Header */}
      <Box
        bg="bg.panel"
        borderBottomWidth="1px"
        borderColor="border"
        position="sticky"
        top="0"
        zIndex="sticky"
        shadow="sm"
      >
        <Container maxW="7xl" px={{ base: "4", md: "8" }} py="4">
          <Flex justify="space-between" align="center" gap="4">
            <HStack gap="3">
              <Box
                p="2"
                rounded="lg"
                bg="blue.500"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={LuAtom} boxSize="5" />
              </Box>
              <VStack align="start" gap="0">
                <Heading size="md" color="fg" lineHeight="1.2">
                  AcademicSearch
                </Heading>
                <Text textStyle="xs" color="fg.muted">
                  Índice de plataformas científicas
                </Text>
              </VStack>
            </HStack>
            <ColorModeButton />
          </Flex>
        </Container>
      </Box>

      {/* Hero */}
      <Box
        bgGradient="to-br"
        gradientFrom="blue.600"
        gradientTo="purple.700"
        py={{ base: "12", md: "16" }}
        px="4"
      >
        <Container maxW="4xl" textAlign="center">
          <HStack justify="center" gap="2" mb="4">
            <Icon as={LuBookOpen} color="blue.200" boxSize="6" />
            <Badge colorPalette="blue" variant="surface" size="lg" px="3">
              {PLATFORMS.length} plataformas indexadas
            </Badge>
          </HStack>
          <Heading
            size={{ base: "2xl", md: "4xl" }}
            color="white"
            mb="4"
            fontWeight="bold"
          >
            Plataformas de Búsqueda
            <Box as="span" color="blue.200"> Académica</Box>
          </Heading>
          <Text
            textStyle={{ base: "md", md: "lg" }}
            color="blue.100"
            mb="8"
            maxW="2xl"
            mx="auto"
          >
            Accede a las principales bases de datos, repositorios y motores de búsqueda científica del mundo
          </Text>
          <Box maxW="xl" mx="auto">
            <InputGroup
              startElement={<Icon as={LuSearch} color="fg.muted" />}
              w="full"
            >
              <Input
                placeholder="Buscar plataforma, descripción o categoría..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                bg="bg.panel"
                size="lg"
                rounded="xl"
                borderColor="transparent"
                _focus={{ borderColor: "blue.400", shadow: "md" }}
              />
            </InputGroup>
          </Box>
        </Container>
      </Box>

      {/* Content */}
      <Container maxW="7xl" px={{ base: "4", md: "8" }} py="8">
        {/* Filters */}
        <Flex
          gap="3"
          mb="6"
          flexWrap="wrap"
          align="center"
          justify="space-between"
        >
          <HStack gap="2" flexWrap="wrap">
            <Icon as={LuFilter} color="fg.muted" boxSize="4" />
            {ALL_CATEGORIES.map(cat => (
              <Box
                key={cat}
                as="button"
                onClick={() => setActiveCategory(cat)}
                px="3"
                py="1"
                rounded="full"
                textStyle="sm"
                fontWeight={activeCategory === cat ? "semibold" : "normal"}
                bg={activeCategory === cat ? "blue.500" : "bg.subtle"}
                color={activeCategory === cat ? "white" : "fg.muted"}
                borderWidth="1px"
                borderColor={activeCategory === cat ? "blue.500" : "border"}
                cursor="pointer"
                transition="all 0.15s"
                _hover={{
                  bg: activeCategory === cat ? "blue.600" : "bg.muted",
                }}
              >
                {cat}
              </Box>
            ))}
          </HStack>
          <HStack gap="2">
            <Box
              as="button"
              onClick={() => setViewMode("grid")}
              p="2"
              rounded="md"
              bg={viewMode === "grid" ? "bg.muted" : "transparent"}
              color={viewMode === "grid" ? "fg" : "fg.muted"}
              cursor="pointer"
              _hover={{ bg: "bg.muted" }}
            >
              <Icon as={LuLayoutGrid} boxSize="4" />
            </Box>
            <Box
              as="button"
              onClick={() => setViewMode("list")}
              p="2"
              rounded="md"
              bg={viewMode === "list" ? "bg.muted" : "transparent"}
              color={viewMode === "list" ? "fg" : "fg.muted"}
              cursor="pointer"
              _hover={{ bg: "bg.muted" }}
            >
              <Icon as={LuList} boxSize="4" />
            </Box>
          </HStack>
        </Flex>

        <Flex align="center" gap="2" mb="6">
          <Text textStyle="sm" color="fg.muted">
            Mostrando <Box as="span" color="fg" fontWeight="semibold">{filtered.length}</Box> plataformas
            {activeCategory !== "Todos" && (
              <> en <Box as="span" color="blue.500" fontWeight="semibold">{activeCategory}</Box></>
            )}
            {query && (
              <> para "<Box as="span" color="blue.500" fontWeight="semibold">{query}</Box>"</>
            )}
          </Text>
        </Flex>

        {/* Grid / List view */}
        {viewMode === "grid" ? (
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap="4"
          >
            {filtered.map(platform => (
              <PlatformCard key={platform.name} platform={platform} />
            ))}
          </Grid>
        ) : (
          <VStack gap="2" align="stretch">
            {filtered.map(platform => (
              <PlatformListItem key={platform.name} platform={platform} />
            ))}
          </VStack>
        )}

        {filtered.length === 0 && (
          <Box textAlign="center" py="16">
            <Icon as={LuSearch} boxSize="12" color="fg.subtle" mb="4" />
            <Heading size="md" color="fg.muted" mb="2">Sin resultados</Heading>
            <Text color="fg.subtle">
              No se encontraron plataformas para "{query}"
            </Text>
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Separator />
      <Box bg="bg.panel" py="6" px="4">
        <Container maxW="7xl">
          <Flex
            justify="space-between"
            align="center"
            flexWrap="wrap"
            gap="3"
          >
            <HStack gap="2">
              <Icon as={LuGlobe} color="fg.muted" boxSize="4" />
              <Text textStyle="sm" color="fg.muted">
                AcademicSearch — {PLATFORMS.length} plataformas de búsqueda académica indexadas
              </Text>
            </HStack>
            <Text textStyle="xs" color="fg.subtle">
              Recursos científicos mundiales
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

function PlatformCard({ platform }: { platform: Platform }) {
  const colorScheme = CATEGORY_COLORS[platform.category] ?? "gray"

  return (
    <Link
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      display="block"
    >
      <Box
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border"
        rounded="xl"
        p="5"
        h="full"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          shadow: "md",
          borderColor: `${colorScheme}.300`,
          transform: "translateY(-2px)",
        }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="3px"
          bg={`${colorScheme}.500`}
          rounded="xl"
        />
        <Flex justify="space-between" align="flex-start" mb="3">
          <Badge
            colorPalette={colorScheme}
            variant="subtle"
            size="sm"
          >
            {platform.category}
          </Badge>
          <Icon as={LuExternalLink} boxSize="4" color="fg.subtle" />
        </Flex>
        <Heading size="sm" color="fg" mb="2" lineClamp={1}>
          {platform.name}
        </Heading>
        <Text textStyle="xs" color="fg.muted" lineClamp={2}>
          {platform.description}
        </Text>
        <Text
          textStyle="xs"
          color={`${colorScheme}.500`}
          mt="3"
          fontFamily="mono"
          lineClamp={1}
        >
          {platform.url.replace(/^https?:\/\//, "")}
        </Text>
      </Box>
    </Link>
  )
}

function PlatformListItem({ platform }: { platform: Platform }) {
  const colorScheme = CATEGORY_COLORS[platform.category] ?? "gray"

  return (
    <Link
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      display="block"
    >
      <Box
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border"
        rounded="lg"
        px="5"
        py="4"
        cursor="pointer"
        transition="all 0.15s"
        _hover={{
          shadow: "sm",
          borderColor: `${colorScheme}.300`,
          bg: "bg.subtle",
        }}
      >
        <Flex align="center" gap="4" flexWrap={{ base: "wrap", md: "nowrap" }}>
          <Box flex="0 0 auto">
            <Badge colorPalette={colorScheme} variant="subtle" size="sm" w="32" textAlign="center">
              {platform.category}
            </Badge>
          </Box>
          <Heading size="sm" color="fg" flex="0 0 auto" w={{ base: "full", md: "48" }} lineClamp={1}>
            {platform.name}
          </Heading>
          <Text textStyle="sm" color="fg.muted" flex="1" lineClamp={1}>
            {platform.description}
          </Text>
          <HStack gap="2" flex="0 0 auto">
            <Text
              textStyle="xs"
              color={`${colorScheme}.500`}
              fontFamily="mono"
              hideBelow="lg"
            >
              {platform.url.replace(/^https?:\/\//, "").replace(/\/$/, "").substring(0, 35)}
            </Text>
            <Icon as={LuExternalLink} boxSize="4" color="fg.subtle" />
          </HStack>
        </Flex>
      </Box>
    </Link>
  )
}
