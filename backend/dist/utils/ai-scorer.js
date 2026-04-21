"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AILeadScorer = void 0;
class AILeadScorer {
    /**
     * Rule-based scoring logic to simulate AI lead prioritization
     * @param lead - The lead object from Prisma
     * @returns score from 0-100
     */
    static calculateScore(lead) {
        let score = 0;
        // 1. Budget weight (up to 40 points)
        if (lead.budget) {
            if (lead.budget > 1000000)
                score += 40;
            else if (lead.budget > 500000)
                score += 30;
            else if (lead.budget > 100000)
                score += 15;
        }
        // 2. Contact info completeness (up to 20 points)
        if (lead.email && lead.phone)
            score += 20;
        else if (lead.email || lead.phone)
            score += 10;
        // 3. Source & Intent (up to 20 points)
        if (lead.source === 'Referral')
            score += 20;
        else if (lead.source === 'Website')
            score += 15;
        else if (lead.source === 'Ad')
            score += 10;
        // Bonus for detailed preferences
        if (lead.preferences && lead.preferences.length > 50)
            score += 10;
        // 4. Activity status (up to 10 points)
        if (lead.status === 'QUALIFIED')
            score += 10;
        else if (lead.status === 'CONTACTED')
            score += 5;
        return Math.min(score, 100);
    }
}
exports.AILeadScorer = AILeadScorer;
