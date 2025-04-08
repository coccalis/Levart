package com.cock.levart;


import com.cock.levart.dto.MessageDto;
import com.cock.levart.dto.Status;
import com.cock.levart.model.*;
import com.cock.levart.repo.*;
import com.cock.levart.service.MessageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
public class TestDataLoader implements CommandLineRunner {

        private final ActivitiesRepo activitiesRepo;
        private final CityRepo cityRepo;
        private final FollowRepo followRepo;
        private final HotelRepo hotelRepo;
        private  final VenueRepo venueRepo;
        private final UserEntityRepo userEntityRepo;
        private final PasswordEncoder passwordEncoder;
        private final PostRepo postRepo;
        private final GroupRepo groupRepo;
        private final MessageRepo messageRepo;

        public TestDataLoader(ActivitiesRepo activitiesRepo, CityRepo cityRepo, FollowRepo followRepo, HotelRepo hotelRepo, VenueRepo venueRepo, UserEntityRepo userEntityRepo, PasswordEncoder passwordEncoder, PostRepo postRepo, GroupRepo groupRepo, MessageRepo messageRepo) {
                this.activitiesRepo = activitiesRepo;
                this.cityRepo = cityRepo;
                this.followRepo = followRepo;
                this.hotelRepo = hotelRepo;
                this.venueRepo = venueRepo;
                this.userEntityRepo = userEntityRepo;
                this.passwordEncoder = passwordEncoder;
                this.postRepo = postRepo;
                this.groupRepo = groupRepo;
                this.messageRepo = messageRepo;
        }

        @Override
        public void run(String... args) throws Exception {
                // Create users
				
                UserEntity user1 = createUser("Sophia ", "Reynolds", "sophia_explores", "sophia@example.com", "password1", "An explorer at heart who loves visiting new cities and hidden gems.",  "https://cocc.blob.core.windows.net/cock/users/profile-1.png", "https://cocc.blob.core.windows.net/cock/background-users/profile-1.jpg", "Rome", "Italy", 1);
                UserEntity user2 = createUser("John", "Doe", "john_o_doe", "john@example.com", "password2", "Adventure enthusiast who enjoys road trips and mountain hikes.", "https://cocc.blob.core.windows.net/cock/users/profile-2.png", "https://cocc.blob.core.windows.net/cock/background-users/profile-2.jpg", "Athens", "Greece", 2);
                UserEntity user3 = createUser("Liam", "Carter", "carter_chronicles", "liam@example.com", "password3", "A travel blogger who shares unique experiences from around the world.", "https://cocc.blob.core.windows.net/cock/users/profile-3.png", "https://cocc.blob.core.windows.net/cock/background-users/profile-3.jpg", "Los Angeles", "USA", 2);
                UserEntity user4 = createUser("Ava", "Mitchell", "ava_mitch", "ava@example.com", "password4", "Culture lover and foodie, always seeking the best local cuisines.", "https://cocc.blob.core.windows.net/cock/users/profile-4.png", "https://cocc.blob.core.windows.net/cock/background-users/profile-4.jpg", "Tokyo", "Japan", 1);

                // Save users
                userEntityRepo.save(user1);
                userEntityRepo.save(user2);
                userEntityRepo.save(user3);
                userEntityRepo.save(user4);
               

				// Create cities


                City city1 = City.builder()
                        .name("New York")
                        .country("USA")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/nyc-us.jpg")
                        .description("The tallest skyscrapers, the biggest museums, the cheesiest pizza. New York City takes everything to the max. It’s easy to see why it’s the most-visited place in the U.S.: Whether you want to check out historic landmarks, catch a Broadway show, or stroll the streets of Brooklyn, there’s no wrong way to do it—and something new to discover every time you go.")
                        .lat("40.7128")
                        .lng("-74.0060")
                        .build();

                cityRepo.save(city1);



                City city2 = City.builder()
                        .name("Tokyo")
                        .country("Japan")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/tokyo-jp.jpg")
                        .description("A vibrant city blending modern skyscrapers, historic temples, and cutting-edge technology, known for its unique culture and cuisine.")
                        .lat("35.6895")
                        .lng("139.6917")
                        .build();

                cityRepo.save(city2);



                City city3 = City.builder()
                        .name("Paris")
                        .country("France")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/paris-fr.jpg")
                        .description("The romantic capital of France, renowned for its art, fashion, and historic landmarks such as the Eiffel Tower and Notre-Dame Cathedral.")
                        .lat("48.8566")
                        .lng("2.3522")
                        .build();

                cityRepo.save(city3);



                City city4 = City.builder()
                        .name("Sydney")
                        .country("Australia")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/sydney-au.jpg")
                        .description("A vibrant coastal city famous for its Sydney Opera House, beautiful beaches, and the Sydney Harbour Bridge.")
                        .lat("-33.8688")
                        .lng("151.2093")
                        .build();

                cityRepo.save(city4);


                City city5 = City.builder()
                        .name("Athens")
                        .country("Greece")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/athens-gr.jpg")
                        .description("The historic capital of Greece, known for its ancient monuments, including the Acropolis and the Parthenon.")
                        .lat("37.9838")
                        .lng("23.7275")
                        .build();

                cityRepo.save(city5);



                City city6 = City.builder()
                        .name("London")
                        .country("United Kingdom")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/london-uk.jpg")
                        .description("The historic and vibrant capital of the UK, famous for landmarks like Big Ben, the Tower of London, and Buckingham Palace.")
                        .lat("51.5074")
                        .lng("-0.1278")
                        .build();

                City city7 = City.builder()
                        .name("Barcelona")
                        .country("Spain")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/barcelona.jpg")
                        .description("When it comes to history, art, and architecture, Barcelona delivers. There’s Gaudí’s iconic Basílica de la Sagrada Familia, the Picasso Museum, and the Gothic Quarter. ")
                        .lat("41.394645")
                        .lng("2.169379")
                        .build();

                City city8 = City.builder()
                        .name("Munich")
                        .country("Germany")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/munich.jpg")
                        .description("Of course, beer lovers know Munich as the epicenter of Oktoberfest, a celebration of beer and Bavarian culture.")
                        .lat("48.140165")
                        .lng("11.573736")
                        .build();
                City city9 = City.builder()
                        .name("Bangkok")
                        .country("Thailand")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/bangkok.jpg")
                        .description("There's no getting around it: Bangkok is intense. Temples swarm with crowds. Street food sizzles into the early hours.")
                        .lat("13.724381")
                        .lng("100.3034615")
                        .build();
                City city10 = City.builder()
                        .name("Budapest")
                        .country("Hungary")
                        .category("city")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/cities/budapest.jpg")
                        .description("Over 15 million gallons of water bubble into Budapest's 118 springs and boreholes every day. ")
                        .lat("47.504960")
                        .lng("19.062068")
                        .build();

                cityRepo.save(city6);
                cityRepo.save(city7);
                cityRepo.save(city8);
                cityRepo.save(city9);
                cityRepo.save(city10);

                Map<String, Boolean> roomFeatures1 = new HashMap<>();
                roomFeatures1.put("Air conditioning", true);
                roomFeatures1.put("Housekeeping", true);
                roomFeatures1.put("Safe", true);
                roomFeatures1.put("Wake up service / alarm clock", true);
                roomFeatures1.put("Flatscreen TV", true);
                roomFeatures1.put("Walk in shower", true);
                roomFeatures1.put("Room service", true);
                roomFeatures1.put("Non-smoking", true);
                roomFeatures1.put("Soundproof rooms", true);

                Map<String, Boolean> propertyAmenities1 = new HashMap<>();
                propertyAmenities1.put("Free High Speed Internet (WiFi)", true);
                propertyAmenities1.put("Fitness Center with Gym / Workout Room", true);
                propertyAmenities1.put("Bar / lounge", true);
                propertyAmenities1.put("Pets Allowed (Dog / Pet Friendly)", true);
                propertyAmenities1.put("Meeting rooms", true);
                propertyAmenities1.put("Parking", true);
                propertyAmenities1.put("Restaurant", true);
                propertyAmenities1.put("24-hour front desk", true);
                propertyAmenities1.put("Airport transportation", true);

                // Create hotels

                Hotel hotel1 = Hotel.builder()
                        .name("Luma Hotel Time Square")
                        .description("Luma Hotel in Time Square offers a cozy escape in the heart of NYC.")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/hotels/luma-hotel-times-square.jpg")
                        .city("New York")
                        .country("United States")
                        .address("120 West 41st Street, New York City, NY 10036-7315")
                        .email("luma@hotel.com")
                        .phone("1 646-941-8229")
                        .website("https://www.lumahotels.com/")
                        .stars("3")
                        .languages("English, Spanish")
                        .propertyAmenities(propertyAmenities1)
                        .roomFeatures(roomFeatures1)
                        .lat("40.75438")
                        .lng("-73.9906749")
                        .category("hotel")
                        .build();

                Hotel hotel2 = Hotel.builder()
                        .name("OBLU SELECT Lobigili")
                        .description("OBLU SELECT Lobigili is as enchanting as its sister property – OBLU SELECT at Sangeli.")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/hotels/oblu-obigili.jpg")
                        .city("Lobigili Island")
                        .country("Maldives")
                        .address("Lobigili Island, Male 20002")
                        .email("oblu@hotel.com")
                        .phone("960 400-0066")
                        .website("https://www.coloursofoblu.com/")
                        .stars("3")
                        .languages("English, Filipino, Hindi")
                        .propertyAmenities(propertyAmenities1)
                        .roomFeatures(roomFeatures1)
                        .lat("4.3068371")
                        .lng("73.5012304")
                        .category("hotel")

                        .build();
                Hotel hotel3 = Hotel.builder()
                        .name("Hotel Vision Budapest")
                        .description("Hotel Vision Budapest is all about unwinding, and your pet can tag along too.")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/hotels/hotel-facade.jpg")
                        .city("Budapest")
                        .country("Hungary")
                        .address("Belgrad Rakpart 24, Budapest 1056 Hungary")
                        .email("vision@hotel.com")
                        .phone("+36 1 550 5800")
                        .website("https://www.hotelvision.hu/")
                        .stars("4")
                        .languages("English, French, German, Hungarian")
                        .propertyAmenities(propertyAmenities1)
                        .roomFeatures(roomFeatures1)
                        .lat("47.490159")
                        .lng("19.052668")
                        .category("hotel")

                        .build();

                Hotel hotel4 = Hotel.builder()
                        .name("Herodion Hotel")
                        .description("Hotel HERODION, a superior first class hotel, the only with sweeping views of both the Acropolis and the acclaimed New Acropolis Museum, distanced only a few meters from its south entrance.")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/hotels/herodion-hotel.jpg")
                        .city("Athens")
                        .country("Greece")
                        .address("4 Rovertou Galli Street Acropolis, Athens 117 42 Greece")
                        .email("herodion@herodion.gr")
                        .phone("+30 214 4025700")
                        .website("https://www.herodion.gr/en/")
                        .stars("4")
                        .languages("English, French, Greek, Italian")
                        .propertyAmenities(propertyAmenities1)
                        .roomFeatures(roomFeatures1)
                        .lat("37.9683734")
                        .lng("23.7245517")
                        .category("hotel")

                        .build();

                Hotel hotel5 = Hotel.builder()
                        .name("Park Hotel Tokyo")
                        .description("Park Hotel Tokyo, opened in 2003, is located on the 25th floor and above in the Shiodome Media Tower.")
                        .imageUrl("https://cocc.blob.core.windows.net/cock/hotels/tokyo-park-tower-.jpg")
                        .city("Tokyo")
                        .country("Japan")
                        .address("1-7-1 Higashi Shimbashi Shiodome Media Tower, Minato 105-7227 Tokyo Prefecture")
                        .email("parkhoteltokyo@hotel.com")
                        .phone("+ 81-3-6252-1111")
                        .website("https://parkhoteltokyo.com/")
                        .stars("4")
                        .languages("English, Japanese")
                        .propertyAmenities(propertyAmenities1)
                        .roomFeatures(roomFeatures1)
                        .lat("35.6630543")
                        .lng("139.7568766")
                        .category("hotel")

                        .build();

                hotelRepo.save(hotel1);
                hotelRepo.save(hotel2);
                hotelRepo.save(hotel3);
                hotelRepo.save(hotel4);
                hotelRepo.save(hotel5);

                // Create activities
                Activities activity1 = Activities.builder()
                        .title("Central Park Walking Tour")
                        .description("For more than 150 years, visitors have flocked to Central Park's 843 green acres in the heart of Manhattan. Since 1980, the Park has been managed by the Central Park Conservancy, in partnership with the public. Central Park is open 6 am to 1 am daily. Visit the official website of Central Park to learn more about Park happenings and activities and to learn how you to help Central Park!")
                        .rating(4.8)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/activities/central-park-walking.jpg")
                        .city("New York")
                        .country("United States")
                        .location("59th Street to 110th Street, between Fifth Avenue and Central Park West, New York City, NY 10019")
                        .type("Outdoor")
                        .hours("6:00 AM - 1:00 AM")
                        .lat("40.7825547")
                        .lng("-73.9681583")
                        .build();

                Activities activity2 = Activities.builder()
                        .title("Inside Broadway Tours")
                        .description("We want to invite you into our world, show you its cast of characters and have you feel the drama (and sometimes comedy) that unfolds right here behind the scenes of Broadway.")
                        .rating(5.0)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/activities/broadway-show.jpg")
                        .city("New York")
                        .country("United States")
                        .location("599 Broadway, New York City, NY 10012-3235")
                        .hours("4:00 PM - 6:00 PM")
                        .type("City Tour")
                        .lat("40.7264635")
                        .lng("-74.0050049")
                        .build();

                Activities activity3 = Activities.builder()
                        .title("Louvre Museum Tour")
                        .description("Explore the world's most famous art collections at the Louvre Museum")
                        .rating(4.7)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/activities/louvre-museum-tour.jpg")
                        .city("Paris")
                        .country("France")
                        .location("99 Rue de Rivoli, 75001 Paris France")
                        .lat("48.860611")
                        .lng("2.3327731")
                        .hours("9:00 AM - 6:00 PM")
                        .website("https://www.louvre.fr/")
                        .telephone(" +33 (0)1 40 20 53 17")
                        .type("Museum Tour")
                        .ticketPrice("42.14")
                        .build();

                Activities activity4 = Activities.builder()
                        .title("teamLab Planets TOKYO" )
                        .description("teamLab Planets (Toyosu, Tokyo) is a museum where you walk through water, and a garden where you become one with the flowers. It comprises 4 large-scale artwork spaces and 2 gardens created by art collective teamLab. teamLab Planets Recognized by GUINNESS WORLD RECORDS™ as the most visited museum (single art group) in the world.")
                        .rating(4.7)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/activities/floating-flower-garden.jpg")
                        .city("Tokyo")
                        .country("Japan")
                        .location("6-1-16, Toyosu, Koto 135-0061 Tokyo Prefecture")
                        .lat("35.6491207")
                        .lng("139.787199")
                        .hours("9:00 AM - 10:00 PM")
                        .website("https://www.teamlab.art/e/planets/")
                        .telephone("+33 (0)1 40 20 53 17")
                        .type("Museum Tour")
                        .ticketPrice("28.28")
                        .build();


                Activities activity5 = Activities.builder()
                        .title("Sydney Harbour Cruise")
                        .description("No trip to Sydney is complete without a cruise through Sydney Harbour where you can see many of the city’s iconic landmarks. ")
                        .rating(4.6)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/activities/sydney-harbour-cruise.jpg")
                        .city("Sydney")
                        .country("Australia")
                        .location("Eastern Pontoon, Sydney NSW 2000, Australia")
                        .lat("-33.8600403")
                        .lng("151.2100358")
                        .hours("10:15 AM - 11:45 AM, 2:30 PM - 4:00 PM")
                        .type("Water Activity")
                        .ticketPrice("34.82")
                        .build();

                Activities activity6 = Activities.builder()
                        .title("Acropolis Museum")
                        .description("Modern, uptodate building on the foot of the Acropolis housing important ancient Greek statues and much more.")
                        .website("https://www.theacropolismuseum.gr/en")
                        .telephone("+30 210 900 09 00")
                        .rating(4.9)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/activities/acropolis-museum.jpg")
                        .city("Athens")
                        .country("Greece")
                        .location("Dionysiou Areopagitou 15, Athens 117 42 Greece")
                        .lat("37.9685765")
                        .lng("23.7257599")
                        .type("Museum Tour")
                        .hours("9:00 AM - 8:00 PM")
                        .ticketPrice("38.02")
                        .build();
                Activities activity7 = Activities.builder()
                        .title("Deluxe Manhattan Helicopter Tour")
                        .description("Enjoy a bird’s eye view of New York City’s top attractions—and admire a perspective of the city that most visitors miss—with this deluxe, extended helicopter tour. ")
                        .website("https://manhattanhelicopters.com/manhattan-helicopter-tours/deluxe-manhattan-helicopter-tour/")
                        .telephone("866-592-9655")
                        .hours(" 9:30 AM - 6:30 PM")
                        .rating(4.3)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/activities/helicopter-tour.jpg")
                        .city("New York")
                        .country("United States")
                        .location("6 East River Piers, New York, NY 10004, USA")
                        .lat("40.7015696")
                        .lng("-74.0092158")
                        .type("City Tour")
                        .ticketPrice("279")
                        .build();


                activitiesRepo.save(activity1);
                activitiesRepo.save(activity2);
                activitiesRepo.save(activity3);
                activitiesRepo.save(activity4);
                activitiesRepo.save(activity5);
                activitiesRepo.save(activity6);
                activitiesRepo.save(activity7);

                //create venues
                Venue venue1 = Venue.builder()
                        .title("Sky Bar Bangkok")
                        .description("Made famous by The Hangover movie franchise, this bar on the 64th floor of the ritzy State Tower in Bangkok’s vibrant Bang Rak business district is great for a glamourous night out. ")
                        .website("https://lebua.com/restaurants/sky/")
                        .telephone("+66 (0)2 624 9999")
                        .rating(2.8)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/venues/sky-bar-bangkok.jpg")
                        .city("Bangkok")
                        .country("Thailand")
                        .address("1055 Silom Road 64th Floor, State Tower at The Dome, Bangkok 10500 Thailand")
                        .location("1055 Silom Road 64th Floor, State Tower at The Dome, Bangkok 10500 Thailand")
                        .lat("13.7216062")
                        .lng("100.5143772")
                        .openHours("5:00")
                        .closeHours("12:00")
                        .priceRange("30-60")
                        .type("Bar")
                        .build();

                Venue venue2 = Venue.builder()
                        .title("Café de Flore")
                        .description("A historic Parisian café known for its artistic ambiance and delicious coffee")
                        .telephone("+33 1 45 48 55 26")
                        .website("https://cafedeflore.fr/en/")
                        .rating(4.7)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/venues/cafe-de-flore.jpg")
                        .city("Paris")
                        .country("France")
                        .address("172 boulevard Saint Germain, 75006 Paris France")
                        .location("172 boulevard Saint Germain, 75006 Paris France")
                        .lat("48.8542422")
                        .lng("2.3322542")
                        .openHours("7:30")
                        .closeHours("1:30")
                        .priceRange("20-50")
                        .type("Coffee Shop")
                        .build();

                Venue venue3 = Venue.builder()
                        .title("La Boqueria Market")
                        .description("A vibrant market in Barcelona offering fresh produce, tapas, and local specialties")
                        .website("https://www.boqueria.barcelona/")
                        .telephone("93 318 20 17")
                        .rating(4.6)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/venues/la-boqueria-market.jpg")
                        .city("Barcelona")
                        .country("Spain")
                        .location("La Rambla, 91, 08001 Barcelona Spain")
                        .address("La Rambla, 91, 08001 Barcelona Spain")
                        .lat("41.3821476")
                        .lng("2.169482")
                        .openHours("8:00")
                        .closeHours("8:30")
                        .type("Shop")
                        .build();

                Venue venue4 = Venue.builder()
                        .title("Peter Luger Steak House")
                        .description("An iconic steakhouse in Brooklyn, known for its prime cuts of beef and classic atmosphere")
                        .website("https://peterluger.com/")
                        .telephone("+1 718-387-7400")
                        .rating(4.2)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/venues/peter-luger-steak-house.jpg")
                        .city("New York")
                        .country("United States")
                        .address("178 Broadway, Brooklyn, NY 11211-6131")
                        .location("178 Broadway, Brooklyn, NY 11211-6131")
                        .lat("40.7098013")
                        .lng("-73.9650726")
                        .openHours("11:45")
                        .closeHours("9:15")
                        .priceRange("30-70")
                        .type("Restaurant")
                        .build();

                Venue venue5 = Venue.builder()
                        .title("Circolo Popolare")
                        .description("Welcome to Circolo Popolare, a vibrant italian restaurant in the heart of London's Fitzrovia. Run by a lively group of 130 passionate Italians, Circolo brings the flavors of Sicily to the city.")
                        .website("https://www.circolopopolare.com/restaurants/circolopopolare-london")
                        .rating(4.5)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/venues/circolo-popolare.jpg")
                        .city("London")
                        .country("United Kingdom")
                        .address("40-41 Rathbone Place, London W1T 1HX England")
                        .location("40-41 Rathbone Place, London W1T 1HX England")
                        .lat("51.5174607")
                        .lng("-0.1363632")
                        .openHours("11:00")
                        .closeHours("10:30")
                        .priceRange("54")
                        .type("Restaurant")
                        .build();

                Venue venue6 = Venue.builder()
                        .title("The Dead Rabbit")
                        .description("An award-winning Irish bar in New York known for its extensive whiskey selection and lively atmosphere")
                        .website("https://thedeadrabbit.com/")
                        .telephone("+1 917-540-5228")
                        .rating(4.8)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/venues/the-dead-rabbit.jpg")
                        .city("New York")
                        .country("United States")
                        .address("30-32 Water St, New York City, NY 10004-2411")
                        .location("30-32 Water St, New York City, NY 10004-2411")
                        .lat("40.7032966")
                        .lng("-74.0136058")
                        .openHours("11:00")
                        .closeHours("3:00")
                        .priceRange("20-40")
                        .type("Bar")
                        .build();
                Venue venue7 = Venue.builder()
                        .title("Come na Vorta Pasta e Vino")
                        .description("A charming eatery offering homemade pasta and a selection of fine wines in a cozy setting.")
                        .website("https://www.facebook.com/pastaevinolargoargentina/")
                        .telephone("+39 06 9918 0600")
                        .rating(4.7)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/venues/come-na-vorta.jpg")
                        .city("Rome")
                        .country("Italy")
                        .location("Via Florida 23, 00186 Rome Italy")
                        .address("Via Florida 23, 00186 Rome Italy")
                        .lat("41.8947834")
                        .lng("12.4742823")
                        .openHours("12:00")
                        .closeHours("11:00")
                        .priceRange("12-30")
                        .type("Restaurant")
                        .build();
                Venue venue8 = Venue.builder()
                        .title("Irmi")
                        .description("\"Eat at least a little\" - this is how Irmi welcomes you. Our Bavarian restaurant provides a feel-good setting and your favourite dishes in the heart of the most beautiful city in the world - Munich. ")
                        .website("https://irmi-muenchen.de/")
                        .telephone("+49 172 675 0982")
                        .rating(4.9)
                        .imageUrl("https://cocc.blob.core.windows.net/cock/venues/irmis.jpg")
                        .city("Munich")
                        .country("Germany")
                        .location("Goethestr. 4, 80336 Munich, Bavaria Germany")
                        .address("Goethestr. 4, 80336 Munich, Bavaria Germany")
                        .lat("48.1386768")
                        .lng("11.5555653")
                        .openHours("5:00 ")
                        .closeHours("11:30")
                        .priceRange("7-30")
                        .type("Restaurant")
                        .category("venue")
                        .build();

                venueRepo.save(venue1);
                venueRepo.save(venue2);
                venueRepo.save(venue3);
                venueRepo.save(venue4);
                venueRepo.save(venue5);
                venueRepo.save(venue6);
                venueRepo.save(venue7);
                venueRepo.save(venue8);

                //posts
                // Post 1
                Post post1 = new Post();
                post1.setDescription("Enjoyed a wonderful stay at Hotel Vision Budapest. The pet-friendly service was a huge bonus!");
                post1.setLocation("Belgrad Rakpart 24, Budapest 1056 Hungary");
                post1.setImageUrl("https://cocc.blob.core.windows.net/cock/posts/caption.jpg");
                post1.setTimestamp("2024-10-27T10:00:00");
                post1.setTags("hotel, pet-friendly, Budapest");
                post1.setCategory("hotel");
                post1.setUser(user1); // Assuming user1 is already created and saved

                // Post 2
                Post post2 = new Post();
                post2.setDescription("The views from Hotel Vision Budapest are breathtaking, especially during sunset.");
                post2.setLocation("Belgrad Rakpart 24, Budapest 1056 Hungary");
                post2.setImageUrl("https://cocc.blob.core.windows.net/cock/posts/ljubomir-zarkovic-7jW0_pYGqSA-unsplash.jpg");
                post2.setTimestamp("2024-10-28T18:30:00");
                post2.setTags("hotel, views, Budapest, sunset");
                post2.setCategory("hotel");
                post2.setUser(user2); // Assuming user2 is already created and saved

                // Post 3
                Post post3 = new Post();
                post3.setDescription("Had an amazing breakfast at Hotel Vision Budapest – highly recommend their local dishes!");
                post3.setLocation("Belgrad Rakpart 24, Budapest 1056 Hungary");
                post3.setImageUrl("https://cocc.blob.core.windows.net/cock/posts/caption-2.jpg");
                post3.setTimestamp("2024-10-29T08:15:00");
                post3.setTags("hotel, breakfast, food, Budapest");
                post3.setCategory("hotel");
                post3.setUser(user3); // Assuming user3 is already created and saved

                // Post 4
                Post post4 = new Post();
                post4.setDescription("Exploring Budapest was even better with Hotel Vision's convenient location near popular spots.");
                post4.setLocation("Belgrad Rakpart 24, Budapest 1056 Hungary");
                post4.setImageUrl("https://cocc.blob.core.windows.net/cock/posts/caption3.jpg");
                post4.setTimestamp("2024-10-30T15:45:00");
                post4.setTags("hotel, Budapest, location");
                post4.setCategory("hotel");
                post4.setUser(user4); // Assuming user4 is already created and saved

                // Post 5
                Post post5 = new Post();
                post5.setDescription("The spa at Hotel Vision Budapest was the perfect way to relax after a long day of sightseeing.");
                post5.setLocation("Belgrad Rakpart 24, Budapest 1056 Hungary");
                post5.setImageUrl("post5-spa-relaxation.jpg");
                post5.setTimestamp("2024-10-31T20:00:00");
                post5.setTags("hotel, spa, relaxation, Budapest");
                post5.setCategory("hotel");
                post5.setUser(user1);

                // Post 6
                Post post6 = new Post();
                post6.setDescription("Every turn in NYC leads to a new adventure! The best way to explore? Just start walking and let the streets guide you!  Where’s your favorite NYC spot?");
                post6.setLocation("New York");
                post6.setImageUrl("https://cocc.blob.core.windows.net/cock/posts/ian-dooley-dcqMsxhU4zo-unsplash.jpg ");
                post6.setTimestamp("2024-10-31T20:00:00");
                post6.setTags("hotel, stroll, NYCAdventures");
                post6.setCategory("city");
                post6.setUser(user4);

                Post post7 = new Post();
                post7.setDescription("The energy of NYC is contagious, and every street corner tells a story. Who else is obsessed with this city?");
                post7.setLocation("New York");
                post7.setImageUrl("https://cocc.blob.core.windows.net/cock/posts/denys-nevozhai-N6t14kV_X68-unsplash.jpg");
                post7.setTimestamp("2024-10-31T20:00:00");
                post7.setTags("hotel, stroll, ILLC<3");
                post7.setCategory("city");
                post7.setUser(user1);

                Post post8 = new Post();
                post8.setDescription("From the dazzling lights of Times Square to the serene beauty of Central Park, NYC is a city that never stops surprising you!");
                post8.setLocation("New York");
                post8.setImageUrl("https://cocc.blob.core.windows.net/cock/posts/andreas-niendorf-l8ypMiU1Hio-unsplash.jpg");
                post8.setTimestamp("2024-10-31T20:00:00");
                post8.setTags("hotel, stroll, NewYorkStateOfMind");
                post8.setCategory("city");
                post8.setUser(user2);

                Post post9 = new Post();
                post9.setDescription("NYC at night? Unmatched. From Broadway shows to rooftop cocktails with skyline views, the city transforms into something magical after dark.");
                post9.setLocation("New York");
                post9.setImageUrl("https://cocc.blob.core.windows.net/cock/posts/vidar-nordli-mathisen-ZYDhBqxJnJ8-unsplash.jpg");
                post9.setTimestamp("2024-10-31T20:00:00");
                post9.setTags("hotel, stroll, nightlife, NYC");
                post9.setCategory("city");
                post9.setUser(user3);

                Post post10 = new Post();
                post10.setDescription("New York is great. I love all the shops and restaurants it offers. A bit a expensive");
                post10.setLocation("New York");
                post10.setImageUrl("post5-spa-relaxation.jpg");
                post10.setTimestamp("2024-10-31T20:00:00");
                post10.setTags("hotel, stroll, yuk, ILLC");
                post10.setCategory("city");
                post10.setUser(user1);

                Post post11 = new Post();
                post11.setDescription("New York is great. I love all the shops and restaurants it offers. A bit a expensive");
                post11.setLocation("New York");
                post11.setImageUrl("post5-spa-relaxation.jpg");
                post11.setTimestamp("2024-10-31T20:00:00");
                post11.setTags("hotel, stroll, yuk, ILLC");
                post11.setCategory("city");
                post11.setUser(user1);

                // Save posts to the repository
                postRepo.save(post1);
                postRepo.save(post2);
                postRepo.save(post3);
                postRepo.save(post4);
                postRepo.save(post5);
                postRepo.save(post6);
                postRepo.save(post7);
                postRepo.save(post8);
                postRepo.save(post9);
                postRepo.save(post10);
                postRepo.save(post11);

                // Create follows
//        Follow follow1 = new Follow();
//        follow1.setFollower(user1);
//        follow1.setFollowed(user2);
//
//        Follow follow2 = new Follow();
//        follow2.setFollower(user2);
//        follow2.setFollowed(user3);
//
//        followRepo.save(follow1);
//        followRepo.save(follow2);
//
//        // Assign followers
//        user1.setFollowers(Set.of(follow1));
//        user2.setFollowers(Set.of(follow2));
//
//        // Assign followed
//        user2.setFollowed(Set.of(follow1));
//        user3.setFollowed(Set.of(follow2));

                // Save updated user entities
                userEntityRepo.save(user1);
                userEntityRepo.save(user2);
                userEntityRepo.save(user3);

                Group group1 = new Group();
                group1.setName("London");
                group1.setInformation("A group about the people of London.");
                group1.setPrivacy("Public");
                group1.setBgImage("https://cocc.blob.core.windows.net/cock/cities/london-uk.jpg");
                group1.setAdminUser(user1);

                Group group2 = new Group();
                group2.setName("Greece");
                group2.setInformation("A group about the people of Greece.");
                group2.setPrivacy("Public");
                group2.setBgImage("https://cocc.blob.core.windows.net/cock/cities/athens-gr.jpg");
                group2.setAdminUser(user2);

                Group group3 = new Group();
                group3.setName("Spain");
                group3.setInformation("A group about the people of Spain.");
                group3.setPrivacy("Public");
                group3.setBgImage("https://cocc.blob.core.windows.net/cock/cities/barcelona.jpg");
                group3.setAdminUser(user3);

                groupRepo.save(group1);
                groupRepo.save(group2);
                groupRepo.save(group3);



        }

        private UserEntity createUser(String firstname, String lastname, String username, String email, String password, String about, String imageUrl, String backgroundImgUrl, String city, String country, Integer layout ) {
                return UserEntity.builder()
                        .firstname(firstname)
                        .lastname(lastname)
                        .username(username)
                        .email(email)
                        .about(about)
                        .backgroundImgUrl(backgroundImgUrl)
                        .imageUrl(imageUrl)
                        .city(city)
                        .country(country)
                        .layout(layout)
                        .password(passwordEncoder.encode(password))
                        .build();
        }

}