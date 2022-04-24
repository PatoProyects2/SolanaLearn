use anchor_lang::prelude::*;

declare_id!("6ueBxDoKpoEDLXfAEz8rQEcNPQjwutysgx3JoKGnRNnv");

#[program]
mod basic_2 {
    use super::*;

    pub fn create(ctx: Context<Create>, authority: Pubkey) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.authority = authority;
        counter.count = 0;
        Ok(())
    }
    
    pub fn initializex(_ctx: Context<Initialize>, num:u64) -> Result<()> {
        msg!("Number x: {}", num);
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>, num:u64) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += num;
        msg!("{}",counter.count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 + 40)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub authority: Pubkey,
    pub count: u64,
}

#[derive(Accounts)]
pub struct Initialize {}