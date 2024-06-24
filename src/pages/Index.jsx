import { Container, Text, VStack, Heading, Box, Image, HStack, Link, Button } from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaGithub, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to My Blog</Heading>
        <Box boxSize="sm">
          <Image src="/images/profile.jpg" alt="Profile Picture" borderRadius="full" boxSize="150px" />
        </Box>
        <Text fontSize="lg" textAlign="center">
          Hi, I'm [Your Name], a passionate blogger who loves to share thoughts on various topics including technology, travel, and lifestyle. Stay tuned for my latest posts!
        </Text>
        <HStack spacing={4}>
          <Link href="https://twitter.com" isExternal>
            <FaTwitter size="24px" />
          </Link>
          <Link href="https://linkedin.com" isExternal>
            <FaLinkedin size="24px" />
          </Link>
          <Link href="https://github.com" isExternal>
            <FaGithub size="24px" />
          </Link>
        </HStack>
        <Button as={RouterLink} to="/add-post" colorScheme="teal" size="lg">Add New Post</Button>
        <VStack spacing={4} width="100%">
          {posts.map((post, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" width="100%">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.content}</Text>
              <Text mt={4} fontSize="sm" color="gray.500">{new Date(post.date).toLocaleString()}</Text>
              <Button leftIcon={<FaTrash />} colorScheme="red" variant="outline" onClick={() => handleDelete(index)}>Delete</Button>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;