import { createContext, useContext, useState } from "react";
import {
    getLevelFromXP,
    getXPProgress
} from "../utils/progression";

const GameContext = createContext();

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

function getDateDifference(date1, date2) {
    const first = new Date(date1);
    const second = new Date(date2);

    const difference =
        Math.abs(second - first) / (1000 * 60 * 60 * 24);

    return Math.round(difference);
}

const initialGameState = {
    totalXP: 0,
    gold: 420,
    streak: 0,
    lastActivityDate: null,

    attributes: {
        intellect: 0,
        strength: 0,
        focus: 0,
        discipline: 0
    },

    inventory: []
};

export function GameProvider({ children }) {

    const [gameState, setGameState] = useState(
        initialGameState
    );

    const [levelUp, setLevelUp] = useState(null);

    const level = getLevelFromXP(gameState.totalXP);

    const progress = getXPProgress(
        gameState.totalXP,
        level
    );


    // --------------------------------
    // ADD XP
    // --------------------------------

    const addXP = (amount) => {

        setGameState((current) => {

            const oldLevel = getLevelFromXP(
                current.totalXP
            );

            const newTotalXP =
                current.totalXP + amount;

            const newLevel =
                getLevelFromXP(newTotalXP);

            if (newLevel > oldLevel) {

                setLevelUp({
                    oldLevel,
                    newLevel
                });

            }

            return {
                ...current,
                totalXP: newTotalXP
            };

        });
    };


    // --------------------------------
    // ADD GOLD
    // --------------------------------

    const addGold = (amount) => {

        setGameState((current) => ({
            ...current,
            gold: current.gold + amount
        }));

    };


    // --------------------------------
    // UPDATE STREAK
    // --------------------------------

    const updateStreak = () => {

        const today = getTodayDate();

        setGameState((current) => {

            if (!current.lastActivityDate) {

                return {
                    ...current,
                    streak: 1,
                    lastActivityDate: today
                };

            }

            if (current.lastActivityDate === today) {

                return current;

            }

            const daysPassed = getDateDifference(
                current.lastActivityDate,
                today
            );

            if (daysPassed === 1) {

                return {
                    ...current,
                    streak: current.streak + 1,
                    lastActivityDate: today
                };

            }

            return {
                ...current,
                streak: 1,
                lastActivityDate: today
            };

        });
    };


    // --------------------------------
    // COMPLETE QUEST REWARD
    // --------------------------------

    const completeQuestReward = ({
        xp,
        gold,
        attribute
    }) => {

        // Add XP
        setGameState((current) => {

            const oldLevel =
                getLevelFromXP(current.totalXP);

            const newTotalXP =
                current.totalXP + xp;

            const newLevel =
                getLevelFromXP(newTotalXP);

            if (newLevel > oldLevel) {

                setLevelUp({
                    oldLevel,
                    newLevel
                });

            }

            const updatedAttributes = {
                ...current.attributes
            };

            if (
                attribute &&
                updatedAttributes[attribute] !== undefined
            ) {
                updatedAttributes[attribute] += 1;
            }

            return {
                ...current,

                totalXP: newTotalXP,

                gold: current.gold + gold,

                attributes: updatedAttributes
            };

        });

        // Update streak
        updateStreak();
    };


    // --------------------------------
    // CLOSE LEVEL-UP POPUP
    // --------------------------------

    const closeLevelUp = () => {
        setLevelUp(null);
    };


    // --------------------------------
    // BUY ITEM
    // --------------------------------

    const buyItem = (item) => {

        if (gameState.gold < item.price) {
            return false;
        }

        setGameState((current) => ({
            ...current,

            gold: current.gold - item.price,

            inventory: [
                ...current.inventory,
                item
            ]
        }));

        return true;
    };


    return (
        <GameContext.Provider
            value={{
                gameState,
                level,
                progress,
                levelUp,
                closeLevelUp,
                addXP,
                addGold,
                updateStreak,
                completeQuestReward,
                buyItem
            }}
        >
            {children}
        </GameContext.Provider>
    );
}


export function useGame() {
    return useContext(GameContext);
}
