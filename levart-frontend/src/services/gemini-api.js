import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function tripPlanner({ tripInfo }) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEM_AI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    //     const prompt = `suggest places in ${tripInfo.destination} for ${
    //       tripInfo.duration
    //     } days. The user likes ${tripInfo.interests.join(
    //       ", "
    //     )} and has a budget of ${
    //       tripInfo.budget
    //     }. (print url images or a name to search for each activity IMPORTANT you suggest and add infront of it + and at the end + ).
    //     Separate each day with --- and the first paragraph where you write an introduction also with ---.
    //     For example: "Day 1: * Morning: insert text\n * Afternoon: insert text\n * Evening: insert text\n *Night: insert text\n . --- Day2: insert text. etc.
    //     On the title for each day add the name of the destination you want them to go IMPORTANT AND THE HIGHLIGHT OF THE DAY FOR EXAMPLE DAY1: BARCELONA. I NEED THE NAME OF THE DESTINATION  IN THE TITLE ALONG WITH EVERYTHING YOU WANT TO ADD SO THE IMAGE API CAN RECOGNIZE IT!!! important sos sos.
    //     DONT RETURN IT IN MARKSDOWN .
    //     DONT START THE PROMT WITH --- EXAMPLE FORMAT OF HOW I WANT IT AND PRINT ONLY IN THIS FORMAT: Day 1:  Barcelona's Gothic Charm and Coastal Delights
    // * Morning: Explore the Gothic Quarter, wandering its narrow streets and discovering hidden plazas.  Visit the Barcelona Cathedral +Barcelona Cathedral+ and the Plaça de Sant Jaume.
    // * Afternoon: Indulge in a tapas crawl through the Born neighborhood, sampling local delicacies at various bars. +Tapas Bars in El Born, Barcelona+
    // * Evening: Enjoy a fine dining experience at Tickets Bar, a renowned restaurant by Albert Adrià. +Tickets Bar, Barcelona+
    // * Night: Experience Barcelona's nightlife at a chic cocktail bar in the El Raval district. +Cocktail bars El Raval+
    // ---
    // `;

    const prompt = `
suggest places in ${tripInfo.destination} for ${
      tripInfo.duration
    } days. The user likes ${tripInfo.interests.join(
      ", "
    )} and has a budget of ${tripInfo.budget}.
Before you output the result follow this guide for the format I want:
1. Add the names or keywords at the end of each section of day for the user to easily search them and enclose them in this symbol “+” for example +New York, Statue of Liberty +.
2. Separate each day with the symbol “---” and add a title for each day. Make sure to include the name of the destination or activity the user will be doing. Follow this format for each day: 
"Day 1 Title: * Morning: insert text\n * Afternoon: insert text\n * Evening: insert text\n *Night: insert text\n . --- Day2 Title: insert text. etc. 
3. Write why the user should do these activities as well and the cost (if the cost isn't accurate make a rough estimate).
4. Don’t return the text in marksdown.
5. Don’t start the prompt with “---“ meaning the first day should not look like this  --- Day 1 etc etc. 
Below you will find an example of a real destination and how I want it to show.
Day 1: Barcelona's Gothic Charm and Coastal Delights * Morning: Explore the Gothic Quarter, wandering its narrow streets and discovering hidden plazas. Visit the Barcelona Cathedral +Barcelona Cathedral+ and the Plaça de Sant Jaume. * Afternoon: Indulge in a tapas crawl through the Born neighborhood, sampling local delicacies at various bars. +Tapas Bars in El Born, Barcelona+ * Evening: Enjoy a fine dining experience at Tickets Bar, a renowned restaurant by Albert Adrià. +Tickets Bar, Barcelona+ * Night: Experience Barcelona's nightlife at a chic cocktail bar in the El Raval district. +Cocktail bars El Raval+ ---
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text() || "No response received";
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
