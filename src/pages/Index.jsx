import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const catBreeds = [
  { name: "Siamese", description: "Vocal and social cats known for their distinctive color points.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", description: "Long-haired cats with a sweet, gentle nature.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", description: "Large, friendly cats often referred to as 'gentle giants'.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", description: "Active, playful cats with a wild-looking spotted coat.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "Scottish Fold", description: "Known for their unique folded ears and round faces.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a 'clowder'.",
  "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats have a third eyelid called the 'haw' to protect their eyes.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You've made a cat very happy.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-8 flex items-center justify-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-4 h-16 w-16" /> Feline Fascination
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {catBreeds.map((breed, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div>
                          <img src={breed.image} alt={breed.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                          <h3 className="text-2xl font-semibold mb-2">{breed.name}</h3>
                          <p className="text-gray-600">{breed.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Info className="mr-2 h-6 w-6" /> About Cats
            </CardTitle>
            <CardDescription>Discover the world of our feline friends</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">
              Cats are enigmatic creatures that have captivated humans for millennia. Known for their independence, agility, and affectionate nature, these furry companions continue to bring joy and wonder to our lives.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="facts">Fun Facts</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle>Feline Features</CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none space-y-4">
                  <motion.li className="flex items-center" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <Paw className="mr-4 h-6 w-6 text-purple-600" /> Excellent hunters with sharp claws and teeth
                  </motion.li>
                  <motion.li className="flex items-center" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <Paw className="mr-4 h-6 w-6 text-purple-600" /> Flexible bodies and quick reflexes
                  </motion.li>
                  <motion.li className="flex items-center" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <Paw className="mr-4 h-6 w-6 text-purple-600" /> Keen senses, especially hearing and night vision
                  </motion.li>
                  <motion.li className="flex items-center" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <Paw className="mr-4 h-6 w-6 text-purple-600" /> Communicate through vocalizations, body language, and scent
                  </motion.li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle>Fun Cat Facts</CardTitle>
                <CardDescription>Discover interesting tidbits about our feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFactIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-center p-4 bg-purple-100 rounded-lg"
                  >
                    <Star className="inline-block mr-2 h-6 w-6 text-yellow-500" />
                    {catFacts[currentFactIndex]}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mb-12">
          <Button onClick={handleLike} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-xl transition-all duration-300 transform hover:scale-105">
            <Heart className="mr-2 h-6 w-6" /> Show Some Love ({likes})
          </Button>
        </div>

        <motion.p 
          className="text-xl italic text-center mt-8 text-purple-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and mystery.
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
