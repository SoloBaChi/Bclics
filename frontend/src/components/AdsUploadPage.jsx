import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import Slider from "react-slick"; // Ensure you have react-slick installed
import Icons from "./Icons";

const MAX_CHAR = 1000;

const AdsUploadPage = () => {
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [imgUrls, setImgUrls] = useState([]);
  const imageRef = useRef(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [pricePoint, setPricePoint] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImgUrls(urls);
  };

  const removeImage = (index) => {
    setImgUrls(imgUrls.filter((_, i) => i !== index));
  };

  // Slider settings for image preview
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="600px"
      height="95vh"
      mx="auto"
      mb={"20rem"}
      mt={4}
      p={4}
      borderWidth={1}
      borderRadius="md"
    >
      <FormControl>
        <Textarea
          placeholder="Post content goes here..."
          onChange={handleTextChange}
          value={postText}
        />
        <Text textAlign="right">
          {remainingChar}/{MAX_CHAR}
        </Text>

        <Input
          type="file"
          hidden
          ref={imageRef}
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <Box display="flex" mt="0.5rem" mb="0.5rem">
          <Text onClick={() => imageRef.current.click()}>Add Image</Text>
          <BsFillImageFill
            style={{ marginLeft: "5px", cursor: "pointer" }}
            size={16}
            onClick={() => imageRef.current.click()}
          />
        </Box>

        {imgUrls.length > 0 && (
          <Box>
            {imgUrls.length === 1 ? (
              <Box position="relative">
                <Image src={imgUrls[0]} borderRadius="md" />
                <Button
                  position="absolute"
                  top="2"
                  right="2"
                  onClick={() => removeImage(0)}
                  size="sm"
                >
                  Remove
                </Button>
              </Box>
            ) : (
              <Slider {...settings}>
                {imgUrls.map((url, index) => (
                  <Box key={index} position="relative">
                    <Image src={url} borderRadius="md" />
                    <Button
                      position="absolute"
                      top="2"
                      right="2"
                      onClick={() => removeImage(index)}
                      size="sm"
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Slider>
            )}
          </Box>
        )}

        <Text mt="0.5rem">Post Header</Text>
        <Input
          placeholder="Write the title of your post"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          mt={4}
        />

        <Text mt="0.5rem">Category</Text>
        <Select
          placeholder="Select category"
          mt={4}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Tech">Tech</option>
          <option value="Fashion">Fashion</option>
          <option value="Sports">Sports</option>
          <option value="Home">Home</option>
        </Select>

        <Text mt="0.5rem">Price</Text>
        <Input
          placeholder="Input the Price"
          type="number"
          mt={4}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Text mt="0.5rem">Phone Number</Text>
        <Input
          placeholder="Enter phone number"
          type="number"
          mt={4}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <Text mt="0.5rem">Location</Text>
        <Input
          placeholder="Write where this is available in"
          mt={4}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Text mt={4}>Condition</Text>
        <Flex gap={4} flexDirection="flex-wrap">
          <Checkbox
            isChecked={condition === "Brand New"}
            onChange={() => setCondition("Brand New")}
          >
            Brand New
          </Checkbox>
          <Checkbox
            isChecked={condition === "Foreign Used"}
            onChange={() => setCondition("Foreign Used")}
          >
            Foreign Used
          </Checkbox>
          <Checkbox
            isChecked={condition === "Nigerian Used"}
            onChange={() => setCondition("Nigerian Used")}
          >
            Nigerian Used
          </Checkbox>
        </Flex>

        <Text mt={4}>Price Point</Text>
        <Flex gap={4} flexDirection="flex-wrap">
          <Checkbox
            isChecked={pricePoint === "Negotiable"}
            onChange={() => setPricePoint("Negotiable")}
          >
            Negotiable Price
          </Checkbox>
          <Checkbox
            isChecked={pricePoint === "Fixed"}
            onChange={() => setPricePoint("Fixed")}
          >
            Fixed Price
          </Checkbox>
        </Flex>

        <Button
          w={"full"}
          colorScheme="blue"
          mt={4}
          onClick={() => {
            /* Add functionality to handle post submission */
          }}
        >
          Post
        </Button>
      </FormControl>
      <Icons />
    </Box>
  );
};

export default AdsUploadPage;
