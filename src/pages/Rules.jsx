function Rules() {
   return (
      <>
         <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--dark)] py-8 text-[var(--white)]">
            <h1 className="mb-4 text-3xl font-bold">
               Exploding Kitten: Game Rules
            </h1>
            <div className="max-w-lg rounded-sm bg-[var(--grey)] p-4 shadow-md">
               <h2 className="mb-2 text-xl font-bold">Objective</h2>
               <p>
                  The objective of the game is to draw all 5 cards from the deck
                  without drawing the Exploding Kitten card.
               </p>
               <h2 className="mb-2 mt-4 text-xl font-bold">Card Types</h2>
               <ul className="ml-6 list-disc">
                  <li>
                     <strong>Cat Card 😼:</strong> Regular cards that are
                     removed from the deck when drawn.
                  </li>
                  <li>
                     <strong>Defuse Card 💣:</strong> Used to defuse an
                     Exploding Kitten card if drawn subsequently.
                  </li>
                  <li>
                     <strong>Shuffle Card 🔀:</strong> Restarts the game,
                     refilling the deck with 5 cards.
                  </li>
                  <li>
                     <strong>Exploding Kitten Card 💥:</strong> If drawn, the
                     player loses the game instantly.
                  </li>
               </ul>
               <h2 className="mb-2 mt-4 text-xl font-bold">Gameplay</h2>
               <p>
                  Start the game by clicking on the deck of cards to reveal and
                  remove one card at a time while keeping in mind the rules
                  mentioned above.
               </p>
               <h2 className="mb-2 mt-4 text-xl font-bold">End of Game</h2>
               <p>
                  The game ends when either the player draws all 5 cards without
                  drawing the Exploding Kitten card (Player Wins), or the player
                  draws the Exploding Kitten card (Player Loses).
               </p>
               <h2 className="mb-2 mt-4 text-xl font-bold">Leaderboard</h2>
               <p>
                  Each win carries a single win point which are shown over the
                  leaderboard page which could be accessed by the dashboard
                  itself. The leaderboard carries the username and total wins by
                  the user
               </p>
            </div>
         </div>
      </>
   )
}

export default Rules
