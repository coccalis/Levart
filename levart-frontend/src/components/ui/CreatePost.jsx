import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { createPost } from "../../services/post-api";
import {
  locationActivityDataCreate,
  locationCityDataCreate,
  locationHotelDataCreate,
  locationVenueDataCreate,
  postCategory,
} from "../../data/locationData";
import {
  cityCategoryRating,
  hotelCategoryRating,
} from "../../data/PostCategoryRating";
import fallbackImg from "../../assets/images/fallback_img.png";
import { useDispatch } from "react-redux";
import { setTriggerRefreshPosts } from "../../store/profileSlice";

function CreatePost({ groupId = null, user, extraStyles = "max-w-6xl" }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [availableLocations, setAvailableLocations] = useState([]);
  const [locationSelected, setLocationSelected] = useState("");
  const imageInput = useRef(null);
  const [postForm, setPostForm] = useState({
    location: "",
    description: "",
    tags: "",
    ratingType: {}, // Used for city & hotel
    rating: 0.0, // Used for activity & venue
    category: "",
    groupId: groupId,
    image: {
      name: "",
      type: "",
      uri: "",
    },
  });

  console.log(postForm);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostForm({
        ...postForm,
        image: {
          name: file.name,
          type: file.type,
          uri: URL.createObjectURL(file),
        },
      });
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await createPost(postForm);
      dispatch(setTriggerRefreshPosts(true));
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setPostForm({
        location: "",
        description: "",
        tags: "",
        ratingType: {},
        rating: 0.0,
        category: "",
        groupId: groupId,
        image: {
          name: "",
          type: "",
          uri: "",
        },
      });
      onOpenChange();
    }
  };

  const handleOnChangeSelectCategory = (e) => {
    const selectedCategory = e.target.value;

    let updatedRating = {};
    if (selectedCategory === "city") {
      updatedRating = {
        ratingType: { ...cityCategoryRating },
        rating: undefined,
      };
    } else if (selectedCategory === "hotel") {
      updatedRating = {
        ratingType: { ...hotelCategoryRating },
        rating: undefined,
      };
    } else {
      updatedRating = { ratingType: undefined, rating: 0.0 };
    }

    setPostForm({ ...postForm, category: e.target.value, ...updatedRating });
  };

  const handleOnChangeSelectLocation = (e) => {
    const selectedKey = e.target.value;
    const selectedItem = availableLocations.find(
      (loc) => loc.key === selectedKey
    );

    if (selectedItem) {
      setPostForm({ ...postForm, location: selectedItem.label });
      setLocationSelected(selectedKey);
    }
  };

  const handleTagChange = (e) => {
    const inputValue = e.target.value;
    const tagsArray = inputValue
      .split(" ")
      .map((tag) => tag.replace("#", "").trim())
      .filter((tag) => tag !== "");
    setPostForm({ ...postForm, tags: tagsArray.join(",") });
  };

  const handleRatingChange = (e, key) => {
    const value = parseFloat(parseFloat(e.target.value).toFixed(1));

    setPostForm((prevForm) => {
      if (prevForm.category === "city" || prevForm.category === "hotel") {
        return {
          ...prevForm,
          ratingType: {
            ...prevForm.ratingType,
            [key]: value,
          },
        };
      } else {
        return { ...prevForm, rating: value };
      }
    });
  };

  const locationDataMap = {
    city: locationCityDataCreate,
    hotel: locationHotelDataCreate,
    activity: locationActivityDataCreate,
    venue: locationVenueDataCreate,
  };

  useEffect(() => {
    if (postForm.category !== "") {
      setAvailableLocations(locationDataMap[postForm.category]);
    }
  }, [postForm.category]);

  return (
    <>
      <div
        className={`${extraStyles} mx-auto border-1 border-gray-200 rounded-lg p-5 my-5 shadow-md cursor-pointer`}
        onClick={onOpen}
      >
        <div className="flex flex-row space-x-5 items-center">
          <Avatar
            radius="full"
            src={user?.imageUrl}
            alt="profile"
            className="w-10 h-10"
          />
          <div className="flex flex-col">
            <h1 className="text-mainText font-semibold">
              {user?.firstname} {user?.lastname}
            </h1>
            <h1 className="text-secondary-text font-semibold">
              @{user?.username}
            </h1>
          </div>
        </div>
        <div className="mt-5">
          <input
            className="w-full h-14 border-1 border-gray-200 rounded-lg p-3 font-semibold"
            placeholder="What’s on your mind? Share your travel stories, tips, or favorite moments with the community!"
          ></input>
        </div>
      </div>

      <Modal
        size="2xl"
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleCreatePost}>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex flex-row space-x-5 items-center">
                  <Avatar
                    radius="full"
                    src={user?.imageUrl}
                    alt="profile"
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-mainText font-semibold text-md">
                      {user?.firstname} {user?.lastname}
                    </h1>
                    <h1 className="text-secondary-text text-sm">
                      @{user?.username}
                    </h1>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder="What made your trip unforgettable? Share it with us!"
                  value={postForm.description}
                  onChange={(e) =>
                    setPostForm({ ...postForm, description: e.target.value })
                  }
                  onClear={() => setPostForm({ ...postForm, description: "" })}
                  maxRows={3}
                  isClearable
                  isRequired
                  variant="bordered"
                  radius="sm"
                  className="w-full"
                  classNames={{
                    inputWrapper: [
                      "border-1 border-transparent shadow-transparent",
                      "font-bold",
                      "group-data-[focus=true]:border-transparent",
                      "group-data-[hover=true]:border-transparent",
                    ],
                  }}
                />

                <div className="flex flex-row space-x-5 items-center">
                  <Select
                    className="max-w-xs"
                    size="sm"
                    label="Post category"
                    labelPlacement="outside"
                    isRequired
                    placeholder="Select a category for your post"
                    selectedKeys={[postForm.category]}
                    variant="bordered"
                    onChange={handleOnChangeSelectCategory}
                    classNames={{
                      innerWrapper: "font-semibold",
                      label: "font-semibold",
                    }}
                  >
                    {postCategory.map((catg) => (
                      <SelectItem key={catg.key}>{catg.label}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    isVirtualized
                    className="max-w-xs"
                    size="sm"
                    label="Location"
                    labelPlacement="outside"
                    isRequired
                    placeholder={
                      postForm.category
                        ? "Select a location"
                        : "Select a category first"
                    }
                    selectedKeys={[locationSelected]}
                    variant="bordered"
                    isDisabled={!postForm.category} // Disable if no category is selected
                    onChange={handleOnChangeSelectLocation}
                    classNames={{
                      innerWrapper: "font-semibold",
                      label: "font-semibold",
                    }}
                  >
                    {availableLocations?.map((loc) => (
                      <SelectItem key={loc.key}>
                        {loc.key
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <Input
                  type="text"
                  value={postForm.tags
                    .split(",")
                    .map((tag) => `#${tag.trim()}`)
                    .join(" ")}
                  onChange={handleTagChange}
                  label="Tags"
                  labelPlacement="outside"
                  placeholder="Tags"
                  radius="sm"
                  variant="bordered"
                  isClearable
                  isRequired
                  classNames={{
                    inputWrapper: ["border-1", "font-semibold"],
                  }}
                  className="w-full"
                />

                <Accordion className="px-0">
                  <AccordionItem
                    key="1"
                    aria-label="rating"
                    title="Rating"
                    subtitle="(optional)"
                    classNames={{
                      title: "font-semibold text-mainText",
                      subtitle: "text-secondary-text font-semibold",
                    }}
                  >
                    {postForm.category === "city" ||
                    postForm.category === "hotel" ? (
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(postForm.ratingType).map((key) => (
                          <div key={key}>
                            <Input
                              key={key}
                              type="number"
                              value={postForm.ratingType[key]}
                              onChange={(e) => handleRatingChange(e, key)}
                              placeholder={key.replace(/-/g, " ").toUpperCase()}
                              label={key
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                              labelPlacement="outside"
                              min={0}
                              max={5}
                              isClearable
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Input
                        type="number"
                        value={postForm.rating}
                        onChange={(e) => handleRatingChange(e, "rating")}
                        placeholder="Overall Rating"
                        min={0}
                        max={5}
                        isClearable
                      />
                    )}
                  </AccordionItem>
                </Accordion>

                <img
                  onClick={() => imageInput.current.click()}
                  src={
                    postForm.image.uri === "" ? fallbackImg : postForm.image.uri
                  }
                  alt="post"
                  className="w-full h-60 object-cover rounded-lg cursor-pointer"
                />

                <input
                  type="file"
                  color="none"
                  onChange={handleUpload}
                  ref={imageInput}
                  accept="image/jpeg, image/jpg, image/png"
                  className="hidden"
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  Post
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
