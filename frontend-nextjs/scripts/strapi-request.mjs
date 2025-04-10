import { writeFileSync } from "node:fs";
import qs from "qs";


const fetchData = async () => {
        // const url = "http://localhost:1337/api/reviews"
        //     + "?" + qs.stringify({            
        //         fields: ["slug", "title", "subtitle" ,"publishedAt"],
        //         populate: { image: { fields: ["url"] } },
        //         sort: ["publishedAt:desc"],
        //         pagination: { pageSize:6}
        //     }, { encodeValuesOnly: true });


      const url = "http://localhost:1337/api/reviews"
            + "?" + qs.stringify({                        
              filters:{slug: {$eq:"hollow-knight"}},
              fields: ["slug", "title", "subtitle" ,"publishedAt", "body"],
              populate: { image: { fields: ["url"] } },
              pagination: { pageSize:1, withCount: false },
            }, { encodeValuesOnly: true });


    console.log(url);
    const response = await fetch(url);
    const body = await response.json();

    const formatted = JSON.stringify(body, null, 2);
    const file = 'scripts/strapi-response.json';
    writeFileSync(file, formatted, "utf8");
};

fetchData();
