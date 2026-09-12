import { useState } from "react";
import { Plus, Swords, Search, Check } from "lucide-react";
import QuestCard from "../components/QuestCard";
import { useGame } from "../context/GameContext";

function Quests() {

    const { completeQuestReward } = useGame();

    const [quests, setQuests] = useState([
        {
            id: 1,
            title: "Study Java for 1 hour",
            description: "Complete one focused Java study session.",
            category: "Knowledge",
            difficulty: "Medium",
            xp: 50,
            gold: 20,
            attribute: "intellect",
            completed: false
        },
        {
            id: 2,
            title: "Complete a workout",
            description: "Finish today's workout session.",
            category: "Strength",
            difficulty: "Easy",
            xp: 40,
            gold: 15,
            attribute: "strength",
            completed: false
        },
        {
            id: 3,
            title: "Read 20 pages",
            description: "Read 20 pages of a useful book.",
            category: "Focus",
            difficulty: "Easy",
            xp: 30,
            gold: 10,
            attribute: "focus",
            completed: true
        }
    ]);

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    const completeQuest = (id) => {

        const quest = quests.find(
            (currentQuest) => currentQuest.id === id
        );

        if (!quest || quest.completed) {
            return;
        }

        // Give RPG rewards
        completeQuestReward({
            xp: quest.xp,
            gold: quest.gold,
            attribute: quest.attribute
        });

        // Mark quest as completed
        setQuests((currentQuests) =>
            currentQuests.map((currentQuest) =>
                currentQuest.id === id
                    ? {
                        ...currentQuest,
                        completed: true
                    }
                    : currentQuest
            )
        );
    };

    const filteredQuests = quests.filter((quest) =>
        quest.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="mx-auto max-w-7xl space-y-6">

            {/* PAGE HEADER */}

            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    <p className="text-sm text-violet-400">
                        QUEST LOG
                    </p>

                    <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                        Your Quests
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Complete real-world challenges and earn rewards.
                    </p>

                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-400 active:scale-95"
                >
                    <Plus size={20} />
                    New Quest
                </button>

            </section>


            {/* TEMPORARY NEW QUEST MESSAGE */}

            {showForm && (
                <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">

                    <p className="font-semibold text-violet-300">
                        Quest creation
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        The full quest creation form will be connected next.
                    </p>

                </div>
            )}


            {/* QUEST STATS */}

            <section className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <p className="text-sm text-gray-500">
                        Total Quests
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {quests.length}
                    </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <p className="text-sm text-gray-500">
                        Completed
                    </p>

                    <p className="mt-2 text-3xl font-bold text-green-400">
                        {
                            quests.filter(
                                (quest) => quest.completed
                            ).length
                        }
                    </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#101522] p-5">

                    <p className="text-sm text-gray-500">
                        Available XP
                    </p>

                    <p className="mt-2 text-3xl font-bold text-violet-400">
                        {
                            quests
                                .filter(
                                    (quest) => !quest.completed
                                )
                                .reduce(
                                    (total, quest) =>
                                        total + quest.xp,
                                    0
                                )
                        }
                    </p>

                </div>

            </section>


            {/* SEARCH */}

            <section>

                <div className="relative">

                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                        type="text"
                        placeholder="Search your quests..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/10 bg-[#101522] py-3 pl-12 pr-4 text-white placeholder-gray-600 outline-none transition focus:border-violet-500"
                    />

                </div>

            </section>


            {/* QUEST LIST */}

            <section>

                <div className="mb-4 flex items-center gap-2">

                    <Swords
                        size={20}
                        className="text-violet-400"
                    />

                    <h2 className="text-xl font-bold">
                        Active Quests
                    </h2>

                </div>


                <div className="space-y-3">

                    {filteredQuests.map((quest) => (

                        <QuestCard
                            key={quest.id}
                            title={quest.title}
                            category={`${quest.category} • ${quest.difficulty}`}
                            xp={quest.xp}
                            gold={quest.gold}
                            completed={quest.completed}
                            onComplete={() =>
                                completeQuest(quest.id)
                            }
                        />

                    ))}


                    {filteredQuests.length === 0 && (

                        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">

                            <p className="text-gray-500">
                                No quests found.
                            </p>

                        </div>

                    )}

                </div>

            </section>


            {/* COMPLETION MESSAGE */}

            <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/5 p-4">

                <Check
                    size={20}
                    className="text-green-400"
                />

                <p className="text-sm text-gray-400">
                    Completing a quest rewards XP, Gold, and character attribute points.
                </p>

            </div>

        </div>
    );
}

export default Quests;