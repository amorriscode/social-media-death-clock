//if you add to this make sure the quotes are stoic AF
const quotes = [
  {
    author: 'Marcus Aurelius',
    quote:
      'You could leave life right now. Let that determine what you do and say and think.',
  },

  {
    author: 'Marcus Aurelius',
    quote:
      'If you are pained by any external thing, it is not this thing that disturbs you, but your own judgment about it. And it is in your power to wipe out this judgment now.',
  },

  {
    author: 'Marcus Aurelius',
    quote:
      'Things stand outside of us, themselves by themselves, neither knowing anything of themselves nor expressing any judgment.',
  },

  {
    author: 'Marcus Aurelius',
    quote:
      'Today I escaped from anxiety. Or no, I discarded it, because it was within me, in my own perceptions, not outside.',
  },

  {
    author: 'Epictetus',
    quote:
      'We should always be asking ourselves: "Is this something that is, or is not, in my control?"',
  },

  {
    author: 'Seneca',
    quote: 'Fate leads the willing, and drags along the reluctant.',
  },

  {
    author: 'Marcus Aurelius',
    quote: "An emerald shines even if it's worth is not spoken of.",
  },

  {
    author: 'Marcus Aurelius',
    quote: 'Waste no more time arguing what a good man should be. Be One.',
  },

  {
    author: 'Marcus Aurelius',
    quote:
      "Think of the life you have lived until now as over and, as a dead man, see what's left as a bonus and live it according to Nature. Love the hand that fate deals you and play it as your own, for what could be more fitting?",
  },

  {
    author: 'Marcus Aurelius',
    quote:
      "In your actions, don't procrastinate. In your conversations, don't confuse. In your thoughts, don't wander. In your soul, don't be passive or aggressive. In your life, don't be all about business.",
  },

  {
    author: 'Marcus Aurelius',
    quote:
      'If it is not right, do not do it, if it is not true, do not say it.',
  },

  {
    author: 'Marcus Aurelius',
    quote: 'The best revenge is not to be like your enemy.',
  },

  {
    author: 'Seneca',
    quote:
      "No person has the power to have everything they want, but it is in their power not to want what they don't have, and to cheerfully put to good use what they do have.",
  },

  {
    author: 'Seneca',
    quote:
      "Nothing, to my way of thinking, is a better proof of a well ordered mind than a man's ability to stop just where he is and pass some time in his own company.",
  },

  {
    author: 'Seneca',
    quote:
      'Life is very short and anxious for those who forget the past, neglect the present, and fear the future.',
  },

  {
    author: 'Epictetus',
    quote:
      'How long are you going to wait before you demand the best for yourself?',
  },

  { author: 'Epictetus', quote: "Don't explain your philosophy. Embody it." },

  {
    author: 'Cato',
    quote:
      "I begin to speak only when I'm certain what I'll say isn't better left unsaid.",
  },

  {
    author: 'Viktor Frankl',
    quote:
      'When we are no longer able to change a situation, we are challenged to change ourselves.',
  },

  {
    author: 'Viktor Frankl',
    quote:
      'What man actually needs is not a tensionless state but rather the striving and struggling for some goal worthy of him.',
  },
];

//gets random quote
const quoteID = Math.floor(Math.random() * quotes.length);

//assigns that quote value
document.querySelector('#quote').innerHTML = quotes[quoteID].quote;

document.querySelector('#quotee').innerHTML = quotes[quoteID].author;
