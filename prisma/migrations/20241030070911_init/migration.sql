-- CreateTable
CREATE TABLE "project" (
    "project_id" UUID NOT NULL,
    "project_type_id" UUID NOT NULL,
    "project_name" VARCHAR(256) NOT NULL,
    "construction_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "construction_stop" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "budget" DECIMAL(64,3),
    "description" TEXT,
    "customer_id" UUID NOT NULL,
    "project_contract_type_id" UUID NOT NULL,
    "project_place_address" VARCHAR(256),
    "total_man_hour" DECIMAL(9,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user_id" UUID NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "project_member" (
    "project_bind_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "project_member_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_member_pkey" PRIMARY KEY ("project_bind_id")
);

-- CreateTable
CREATE TABLE "material_master" (
    "material_id" UUID NOT NULL,
    "material_name" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_master_pkey" PRIMARY KEY ("material_id")
);

-- CreateTable
CREATE TABLE "project_material" (
    "project_material_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "material_id" UUID NOT NULL,

    CONSTRAINT "project_material_pkey" PRIMARY KEY ("project_material_id")
);

-- CreateTable
CREATE TABLE "construction_word" (
    "construction_word_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "construction_word_name" VARCHAR(45) NOT NULL,
    "construction_place" VARCHAR(245) NOT NULL,
    "construction_area" DECIMAL(12,3) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "construction_word_pkey" PRIMARY KEY ("construction_word_id")
);

-- CreateTable
CREATE TABLE "construction_type_master" (
    "construction_type_id" UUID NOT NULL,
    "construction_type_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "construction_type_master_pkey" PRIMARY KEY ("construction_type_id")
);

-- CreateTable
CREATE TABLE "project_construction_type" (
    "project_construction_type_id" UUID NOT NULL,
    "construction_type_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_construction_type_pkey" PRIMARY KEY ("project_construction_type_id")
);

-- CreateTable
CREATE TABLE "project_contract_status" (
    "project_contract_status_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "project_contract_status_seq_master_id" UUID NOT NULL,
    "status_name" VARCHAR(45) NOT NULL,
    "status_reason" TEXT NOT NULL,
    "is_project_stop" BOOLEAN NOT NULL DEFAULT false,
    "status_timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_contract_status_pkey" PRIMARY KEY ("project_contract_status_id")
);

-- CreateTable
CREATE TABLE "project_contract_type_master" (
    "project_contract_type_master_id" UUID NOT NULL,
    "project_contract_type_name" VARCHAR(45) NOT NULL,
    "project_stop_flg" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_contract_type_master_pkey" PRIMARY KEY ("project_contract_type_master_id")
);

-- CreateTable
CREATE TABLE "project_contract_status_seq_master" (
    "project_contract_status_seq_master_id" UUID NOT NULL,
    "status_name" VARCHAR(45) NOT NULL,
    "status_seq_number" INTEGER NOT NULL,
    "project_contract_type_master_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_contract_status_seq_master_pkey" PRIMARY KEY ("project_contract_status_seq_master_id")
);

-- CreateTable
CREATE TABLE "project_work_type_master" (
    "project_work_type_master_id" UUID NOT NULL,
    "project_type_name" VARCHAR(45) NOT NULL,
    "project_stop_flg" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_work_type_master_pkey" PRIMARY KEY ("project_work_type_master_id")
);

-- CreateTable
CREATE TABLE "project_work_status" (
    "project_work_status_id" UUID NOT NULL,
    "is_project_stop" BOOLEAN NOT NULL DEFAULT false,
    "project_id" UUID NOT NULL,
    "project_status_seq_master_id" UUID NOT NULL,
    "status_name" VARCHAR(45) NOT NULL,
    "status_reason" TEXT NOT NULL,
    "status_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_work_status_pkey" PRIMARY KEY ("project_work_status_id")
);

-- CreateTable
CREATE TABLE "project_work_status_seq_master" (
    "project_status_seq_master_id" UUID NOT NULL,
    "project_work_type_master_id" UUID NOT NULL,
    "status_name" VARCHAR(45) NOT NULL,
    "status_seq_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_work_status_seq_master_pkey" PRIMARY KEY ("project_status_seq_master_id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_project_type_id_fkey" FOREIGN KEY ("project_type_id") REFERENCES "project_work_type_master"("project_work_type_master_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_project_contract_type_id_fkey" FOREIGN KEY ("project_contract_type_id") REFERENCES "project_contract_type_master"("project_contract_type_master_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_material" ADD CONSTRAINT "project_material_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material_master"("material_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_material" ADD CONSTRAINT "project_material_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "construction_word" ADD CONSTRAINT "construction_word_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_construction_type" ADD CONSTRAINT "project_construction_type_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_construction_type" ADD CONSTRAINT "project_construction_type_construction_type_id_fkey" FOREIGN KEY ("construction_type_id") REFERENCES "construction_type_master"("construction_type_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_contract_status" ADD CONSTRAINT "project_contract_status_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_contract_status" ADD CONSTRAINT "project_contract_status_project_contract_status_seq_master_fkey" FOREIGN KEY ("project_contract_status_seq_master_id") REFERENCES "project_contract_status_seq_master"("project_contract_status_seq_master_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_contract_status_seq_master" ADD CONSTRAINT "project_contract_status_seq_master_project_contract_type_m_fkey" FOREIGN KEY ("project_contract_type_master_id") REFERENCES "project_contract_type_master"("project_contract_type_master_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_work_status" ADD CONSTRAINT "project_work_status_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_work_status" ADD CONSTRAINT "project_work_status_project_status_seq_master_id_fkey" FOREIGN KEY ("project_status_seq_master_id") REFERENCES "project_work_status_seq_master"("project_status_seq_master_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_work_status_seq_master" ADD CONSTRAINT "project_work_status_seq_master_project_work_type_master_id_fkey" FOREIGN KEY ("project_work_type_master_id") REFERENCES "project_work_type_master"("project_work_type_master_id") ON DELETE CASCADE ON UPDATE CASCADE;
