import { useState, useEffect, useRef } from "react";
import { Cat, Heart, Info, Paw, Star, Moon, Sun, HelpCircle, Camera, Share2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toPng } from 'html-to-image';

const catBreeds = [
  { name: "Siamese", description: "Vocal and social cats known for their distinctive color points.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", personality: "Talkative, intelligent, and affectionate", origin: "Thailand" },
  { name: "Persian", description: "Long-haired cats with a sweet, gentle nature.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", personality: "Calm, quiet, and dignified", origin: "Persia (Iran)" },
  { name: "Maine Coon", description: "Large, friendly cats often referred to as 'gentle giants'.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", personality: "Gentle, sociable, and playful", origin: "United States" },
  { name: "Bengal", description: "Active, playful cats with a wild-looking spotted coat.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", personality: "Energetic, curious, and athletic", origin: "United States" },
  { name: "Scottish Fold", description: "Known for their unique folded ears and round faces.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg", personality: "Sweet-tempered, adaptable, and intelligent", origin: "Scotland" },
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

const catCareTips = [
  { title: "Regular Vet Check-ups", description: "Schedule annual check-ups to keep your cat healthy." },
  { title: "Proper Nutrition", description: "Feed your cat a balanced diet appropriate for their age and health status." },
  { title: "Fresh Water", description: "Provide clean, fresh water daily and wash water bowls regularly." },
  { title: "Litter Box Maintenance", description: "Clean the litter box daily and provide enough boxes for multi-cat households." },
  { title: "Grooming", description: "Brush your cat regularly to prevent matting and reduce hairballs." },
  { title: "Mental Stimulation", description: "Provide toys and playtime to keep your cat mentally and physically active." },
  { title: "Safe Environment", description: "Cat-proof your home to prevent accidents and injuries." },
  { title: "Affection and Attention", description: "Spend quality time with your cat to strengthen your bond." },
];

const quizQuestions = [
  { question: "What is a group of cats called?", options: ["Pack", "Herd", "Clowder", "Flock"], correctAnswer: "Clowder" },
  { question: "How many hours do cats typically sleep in a day?", options: ["8-10", "12-14", "16-20", "22-23"], correctAnswer: "16-20" },
  { question: "Which of these is NOT a natural behavior for cats?", options: ["Scratching", "Purring", "Barking", "Kneading"], correctAnswer: "Barking" },
  { question: "What is the average lifespan of an indoor cat?", options: ["5-7 years", "8-10 years", "12-15 years", "15-20 years"], correctAnswer: "12-15 years" },
  { question: "Which sense is most highly developed in cats?", options: ["Sight", "Smell", "Hearing", "Taste"], correctAnswer: "Hearing" },
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [catName, setCatName] = useState("");
  const [showNameCard, setShowNameCard] = useState(false);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const cardRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You've made a cat very happy.",
    });
  };

  const handleAnswerSubmit = (answer) => {
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${quizQuestions[currentQuestionIndex].correctAnswer}`,
        variant: "destructive",
      });
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizStarted(false);
      toast({
        title: "Quiz Completed!",
        description: `Your score: ${score + (answer === quizQuestions[currentQuestionIndex].correctAnswer ? 1 : 0)}/${quizQuestions.length}`,
      });
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (catName.trim()) {
      setShowNameCard(true);
      toast({
        title: "Welcome!",
        description: `Nice to meet you, ${catName}!`,
      });
    }
  };

  const handleShareCard = async () => {
    if (cardRef.current === null) {
      return;
    }
    
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `${catName}'s-cat-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      toast({
        title: "Oops!",
        description: "There was an error generating your cat card.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-purple-100 to-pink-100'} transition-colors duration-300`}>
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-purple-300 to-pink-300 opacity-50 pointer-events-none"
        style={{ opacity }}
      />
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-6xl font-bold flex items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Cat className="mr-4 h-16 w-16" /> Feline Fascination
          </motion.h1>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleNameSubmit} className="flex items-center">
              <Input
                type="text"
                placeholder="Enter your cat's name"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="mr-2"
              />
              <Button type="submit">Submit</Button>
            </form>
            <div className="flex items-center space-x-2">
              <Sun className="h-6 w-6" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                id="dark-mode-toggle"
              />
              <Moon className="h-6 w-6" />
            </div>
          </div>
        </div>

        {showNameCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card ref={cardRef} className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-6 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">{catName}'s Cat Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl mb-4">Welcome to the fascinating world of cats, {catName}!</p>
                <p className="text-lg">You're purr-fect just the way you are!</p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleShareCard} className="bg-white text-purple-600 hover:bg-purple-100">
                  <Share2 className="mr-2 h-4 w-4" /> Share Card
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

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
                  <Card className="h-full">
                    <CardContent className="flex flex-col h-full justify-between p-6">
                      <div>
                        <img src={breed.image} alt={breed.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">{breed.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{breed.description}</p>
                        <p className="text-sm"><strong>Personality:</strong> {breed.personality}</p>
                        <p className="text-sm"><strong>Origin:</strong> {breed.origin}</p>
                      </div>
                    </CardContent>
                  </Card>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="facts">Fun Facts</TabsTrigger>
            <TabsTrigger value="care">Care Tips</TabsTrigger>
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
                    className="text-xl text-center p-4 bg-purple-100 dark:bg-purple-900 rounded-lg"
                  >
                    <Star className="inline-block mr-2 h-6 w-6 text-yellow-500" />
                    {catFacts[currentFactIndex]}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="care">
            <Card>
              <CardHeader>
                <CardTitle>Cat Care Tips</CardTitle>
                <CardDescription>Essential advice for cat owners</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {catCareTips.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b pb-2"
                    >
                      <h3 className="font-semibold">{tip.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mb-12">
          <Button onClick={handleLike} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-xl transition-all duration-300 transform hover:scale-105">
            <Heart className="mr-2 h-6 w-6" /> Show Some Love ({likes})
          </Button>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-6 w-6" /> Cat Quiz
            </CardTitle>
            <CardDescription>Test your cat knowledge!</CardDescription>
          </CardHeader>
          <CardContent>
            {!quizStarted ? (
              <Button onClick={() => { setQuizStarted(true); setCurrentQuestionIndex(0); setScore(0); }}>
                Start Quiz
              </Button>
            ) : (
              <div>
                <h3 className="text-xl mb-4">Question {currentQuestionIndex + 1} of {quizQuestions.length}</h3>
                <p className="mb-4">{quizQuestions[currentQuestionIndex].question}</p>
                <div className="grid grid-cols-2 gap-4">
                  {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                    <Button key={index} onClick={() => handleAnswerSubmit(option)}>
                      {option}
                    </Button>
                  ))}
                </div>
                <Progress value={(currentQuestionIndex / quizQuestions.length) * 100} className="mt-4" />
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-8 bg-purple-600 hover:bg-purple-700">
              <Camera className="mr-2 h-4 w-4" /> Cat Photo Booth
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cat Photo Booth</DialogTitle>
              <DialogDescription>
                Upload a photo of your cat and we'll add some fun effects!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cat-photo" className="text-right">
                  Photo
                </Label>
                <Input id="cat-photo" type="file" accept="image/*" className="col-span-3" />
              </div>
            </div>
            <Button type="submit">Apply Effects</Button>
          </DialogContent>
        </Dialog>

        <motion.p 
          className="text-xl italic text-center mt-8 text-purple-700 dark:text-purple-300"
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
