# Some notes:

## SSR
I have opted out of server side rendering completely for this project. There was nothing in the test instructions mandating the use of SSR, and the feel of the project indicated more of an app approach to me so I’ve elected to set up a barebones REST api and a completely separate 

## Monorepo
Setting this system up with separate separate repositories felt the most appropriate considering the split server/client architecture. The project was developed this way, what you see here is just the two repos mashed together inside a new monorepo to make it easier to evaluate the code.

## Boilerplates
I’ve used create-react-app for the client. For the server I opted not to use a ready made MERN boilerplate since I haven’t set up a MERN stack in a while and I wanted to go through the process myself. This likely leaves out some nice-to-haves that I didn’t have time to implement, but I figured it was a better exercise

## Styling
The test instructions are advocating the use of an emotion/styled-system/rebass stack for styling. It looks to me like styled-system and rebass are both dead as they haven’t been updated for 5 - 6 years, and the docs for rebass are unavailable. 

I was looking into using some other component library based on emotion, but I couldn’t find anything I liked so in the end I opted for Tailwind and Headless UI instead because I’m familiar with it. I built a tiny barebones UI library for the components that I’m using in the app.
 
## Testing
I’ve created a basic test suite for the API endpoints. The test environment isn’t fully fleshed out, for example, the tests run towards the actual database instead of a test db. I haven’t added any tests to the client.

# Screenshots
<img width="1790" alt="image" src="https://github.com/harumanu/songs/assets/3128083/b4bad727-8259-43fb-af2c-62b90968d5fb">
<img width="1784" alt="image" src="https://github.com/harumanu/songs/assets/3128083/9c9bc640-4f74-49f2-bfe7-b640c319fc8e">
<img width="1791" alt="image" src="https://github.com/harumanu/songs/assets/3128083/fad69f3c-58df-4c3e-8a04-923a503dc62e">
<img width="1792" alt="image" src="https://github.com/harumanu/songs/assets/3128083/fc535857-c7f3-4dab-9d81-7882883a357e">
<img width="1792" alt="image" src="https://github.com/harumanu/songs/assets/3128083/2be1a8e6-8728-4d2e-a1f6-6fa8ac29e8cd">
