import React, { useState } from 'react';
import { STACK } from '../../data/stack';
import './Stack.css';

const Stack = () => {
  // First category and first tool selected by default
  const categories = Object.keys(STACK);
  const initialCategory = categories[0] || 'Languages';
  const initialItem = Object.keys(STACK[initialCategory] || {})[0] || 'Java';

  const [selected, setSelected] = useState({
    category: initialCategory,
    name: initialItem,
    description: STACK[initialCategory]?.[initialItem] || '',
  });

  const handleSelect = (category, name) => {
    setSelected({
      category,
      name,
      description: STACK[category][name],
    });
  };

  return (
    <section id="stack">
      <div className="w">
        <span className="mono">Stack</span>
        <h2>The tools I reach for first.</h2>

        <div className="stk">
          <div className="stk-rows">
            {Object.entries(STACK).map(([category, items]) => (
              <div className="row" key={category}>
                <span className="mono">{category}</span>
                <div className="tags">
                  {Object.keys(items).map((name) => {
                    const isPressed =
                      selected.category === category && selected.name === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        aria-pressed={isPressed}
                        onClick={() => handleSelect(category, name)}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="det" aria-live="polite">
            <span className="mono">{selected.category}</span>
            <b>{selected.name}</b>
            <p>{selected.description}</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Stack;

