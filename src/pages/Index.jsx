import { useState } from "react";
import { Cat, Heart, Info, Paw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const catBreeds = [
  { name: "Siamese", description: "Vocal and social cats known for their distinctive color points." },
  { name: "Persian", description: "Long-haired cats with a sweet, gentle nature." },
  { name: "Maine Coon", description: "Large, friendly cats often referred to as 'gentle giants'." },
  { name: "Bengal", description: "Active, playful cats with a wild-looking spotted coat." },
  { name: "Scottish Fold", description: "Known for their unique folded ears and round faces." },
];

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a 'clowder'.",
  "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const { toast } = useToast();

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You've made a cat very happy.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-8 flex items-center justify-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-4 h-12 w-12" /> Feline Fascination
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="A cute cat"
            className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-2xl mb-8"
          />
        </motion.div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2" /> About Cats
            </CardTitle>
            <CardDescription>Discover the world of our feline friends</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">
              Cats are enigmatic creatures that have captivated humans for millennia. Known for their independence, agility, and affectionate nature, these furry companions continue to bring joy and wonder to our lives.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="characteristics" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle>Feline Features</CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none space-y-2">
                  <li className="flex items-center"><Paw className="mr-2 h-4 w-4 text-purple-600" /> Excellent hunters with sharp claws and teeth</li>
                  <li className="flex items-center"><Paw className="mr-2 h-4 w-4 text-purple-600" /> Flexible bodies and quick reflexes</li>
                  <li className="flex items-center"><Paw className="mr-2 h-4 w-4 text-purple-600" /> Keen senses, especially hearing and night vision</li>
                  <li className="flex items-center"><Paw className="mr-2 h-4 w-4 text-purple-600" /> Communicate through vocalizations, body language, and scent</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Cat Breeds</CardTitle>
                <CardDescription>Explore popular cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {catBreeds.map((breed, index) => (
                    <li key={index} className="border-b pb-2">
                      <h3 className="font-semibold text-lg">{breed.name}</h3>
                      <p className="text-sm text-gray-600">{breed.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Fun Cat Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {catFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={handleLike} className="bg-pink-500 hover:bg-pink-600">
            <Heart className="mr-2 h-4 w-4" /> Show Some Love ({likes})
          </Button>
        </div>

        <p className="text-lg italic text-center mt-8 text-purple-700">
          Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and mystery.
        </p>
      </div>
    </div>
  );
};

export default Index;
